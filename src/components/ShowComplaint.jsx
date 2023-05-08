import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { complaintService } from "../services/complaints.services";
import DataTable from "react-data-table-component";
import AddComplaint from "./AddComplaint";

const ShowComplaint = () => {
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  //let [flag, setFlag] = useState(false);
  console.log(isAdmin);
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchAllComplaints();
    } else {
      fetchComplaints();
    }
  }, []);

  const fetchComplaints = async () => {
    let data = complaintService.getMyComplaints();
    let newData = (await data).docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setComplaints(newData);
  };

  const fetchAllComplaints = async () => {
    let data = complaintService.getAllComplaints();
    let newData = (await data).docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setComplaints(newData);
  };

  const columnsAdmin = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Timestamp",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      cell: (row) => (
        <button
          className="btn btn-outline-dark"
          onClick={async () => {
            navigate("/updateStatus", {
              state: {
                id: row.id,
                user_id: row.user_id,
                title: row.title,
                status: "Created",
                description: row.description,
                date: row.date,
              },
            });
          }}
        >
          Created
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) => (
        <button
          className="btn btn-outline-dark"
          onClick={async () => {
            navigate("/updateStatus", {
              state: {
                id: row.id,
                user_id: row.user_id,
                title: row.title,
                status: "Pending",
                description: row.description,
                date: row.date,
              },
            });
          }}
        >
          Pending
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) => (
        <button
          className="btn btn-outline-dark"
          onClick={async () => {
            navigate("/updateStatus", {
              state: {
                id: row.id,
                user_id: row.user_id,
                title: row.title,
                status: "Completed",
                description: row.description,
                date: row.date,
              },
            });
          }}
        >
          Complete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Timestamp",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      cell: (row) => (
        <button
          className="btn btn-outline-warning"
          onClick={async () => {
            navigate("/update", {
              state: {
                id: row.id,
                user_id: row.user_id,
                title: row.title,
                status: row.status,
                description: row.description,
                date: row.date,
              },
            });
          }}
        >
          Edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) => (
        <button
          className="btn btn-outline-danger"
          onClick={async () => {
            await complaintService.deleteComplaint(row.id);
            fetchComplaints();
          }}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.status.includes("Created"),
      style: {
        backgroundColor: "#ffcccc",
        color: "black",
        fontSize: "15px",
      },
    },
    // You can also pass a callback to style for additional customization
    {
      when: (row) => row.status.includes("Pending"),
      style: {
        backgroundColor: "#ffffcc",
        fontSize: "15px",
      },
    },
    {
      when: (row) => row.status.includes("Completed"),
      style: {
        backgroundColor: "#ccffcc",
        fontSize: "15px",
      },
    },
  ];

  return (
    <>
      {!isAdmin && <AddComplaint />}
      <DataTable
        conditionalRowStyles={conditionalRowStyles}
        columns={(isAdmin && columnsAdmin) || (!isAdmin && columns)}
        data={complaints}
        pagination
        subHeader
        persistTableHead
      />
    </>
  );
  // return (
  //   <div>
  //     {isAdmin && (
  //       <button
  //         type="button"
  //         className="btn btn-outline-info"
  //         onClick={() => {
  //           setFlag(true);
  //           fetchAllComplaints();
  //         }}
  //       >
  //         All Complaints
  //       </button>
  //     )}
  //     {isAdmin && (
  //       <button
  //         type="button"
  //         className="btn btn-outline-info"
  //         onClick={() => {
  //           setFlag(false);
  //           console.log(flag);
  //           fetchComplaints();
  //         }}
  //       >
  //         My Complaints
  //       </button>
  //     )}
  //     <Table striped bordered size="sm">
  //       <thead>
  //         <tr>
  //           <th>Sr.No</th>
  //           <th>Title</th>
  //           <th>Description</th>
  //           <th>Status</th>
  //           <th>Timestamp</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {complaints.map((item, index) => {
  //           return (
  //             <tr key={index}>
  //               <td>{index + 1}</td>
  //               <td>{item.title}</td>
  //               <td>{item.description}</td>
  //               <td>{item.status}</td>
  //               <td>{item.date}</td>
  //               {flag && (
  //                 <td>
  //                   <button
  //                     type="button"
  //                     className="btn btn-outline-warning"
  //                     onClick={() => {
  //                       navigate("/updateStatus", {
  //                         state: {
  //                           id: item.id,
  //                           user_id: item.user_id,
  //                           title: item.title,
  //                           status: item.status,
  //                           description: item.description,
  //                           date: item.date,
  //                         },
  //                       });
  //                     }}
  //                   >
  //                     Update Status
  //                   </button>
  //                 </td>
  //               )}

  //               {!flag && (
  //                 <td>
  //                   <button
  //                     type="button"
  //                     className="btn btn-outline-warning"
  //                     onClick={async () => {
  //                       navigate("/update", {
  //                         state: {
  //                           id: item.id,
  //                           user_id: item.user_id,
  //                           title: item.title,
  //                           status: item.status,
  //                           description: item.description,
  //                           date: item.date,
  //                         },
  //                       });
  //                     }}
  //                   >
  //                     Edit
  //                   </button>
  //                 </td>
  //               )}
  //               {!flag && (
  //                 <td>
  //                   <button
  //                     type="button"
  //                     className="btn btn-outline-danger"
  //                     onClick={async () => {
  //                       await complaintService.deleteComplaint(item.id);
  //                       fetchComplaints();
  //                     }}
  //                   >
  //                     Delete
  //                   </button>
  //                 </td>
  //               )}
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </Table>
  //   </div>
  // );
};

export default ShowComplaint;
