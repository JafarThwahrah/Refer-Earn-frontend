import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Cookies from "js-cookie";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminPage() {
  const [rows, setRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchClick = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.get(`admin/get-users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          name: searchInput,
        },
      });
      console.log(response);
      setRows(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.get(`admin/get-users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal: abortController.signal,
        });
        setRows(response.data.data);
      } catch (error) {
        console.log(error);
        if (!abortController.signal.aborted) {
        }
      }
    })();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <h4 className="text-center mt-5">Users table</h4>
      <div style={{ width: "30rem" }} className="container-fluid mt-3">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            onClick={handleSearchClick}
            type="button"
          >
            Search
          </button>
        </form>
      </div>
      <TableContainer
        style={{ height: "90vh" }}
        className="d-flex justify-content-center"
        component={Paper}
      >
        <Table
          className="m-5"
          sx={{ maxWidth: 1000 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email&nbsp;</StyledTableCell>
              <StyledTableCell align="center">
                Registration Date&nbsp;
              </StyledTableCell>
              <StyledTableCell align="center">
                Total Points&nbsp;
              </StyledTableCell>
              <StyledTableCell align="center">
                Number of Referreds users&nbsp;
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.registration_date}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.total_points}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.num_of_referred_users}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
