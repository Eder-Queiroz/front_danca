import React, { useState, useEffect } from "react";
import { Table, InputGroup, InputGroupText, Input, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { getClients } from "../../../api/api";

const handleSearch = (search: any) => {
  const clients = document.querySelectorAll(".clientName");

  clients.forEach((client) => {
    const clientName = client.innerHTML.toLocaleLowerCase();

    client.parentElement?.setAttribute("style", "dysplay: table-row");

    if (!clientName.includes(search))
      client.parentElement?.setAttribute("style", "display: none");
  });
};

export default function Client() {
  const [currentClient, setCurrentCLient] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      const response = await getClients();
      setCurrentCLient(response.response);
      setLoad(false);
    };

    loadClients();
  }, []);

  if (load) {
    return (
      <div
        style={{ width: "100%", height: "76vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Spinner>Carregando...</Spinner>
      </div>
    );
  }

  return (
    <React.Fragment>
      <h1 className="text-center">Clientes</h1>
      <div className="d-sm-flex flex-column align-items-center gap-2 py-3">
        <InputGroup className="w-25">
          <InputGroupText>
            <i className="bi bi-search"></i>
          </InputGroupText>
          <Input
            placeholder="pesquisar"
            type="text"
            onChange={(e) => handleSearch(e.target.value.toLowerCase())}
          ></Input>
        </InputGroup>
        <Table className="w-75">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(currentClient || []).map((client) => {
              return (
                <tr key={client["id"]}>
                  <th scope="row">{client["id"]}</th>
                  <td className="clientName">{client["nome"]}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/clientes/${client["id"]}`}>
                        <i className="bi bi-info-circle-fill"></i>
                      </Link>
                      <Link to={"#"}>
                        <i className="bi bi-currency-dollar text-success"></i>
                      </Link>
                      <Link to={"#"}>
                        <i className="bi bi-calendar-event text-dark"></i>
                      </Link>
                      <Link to={"#"}>
                        <i className="bi bi-trash text-danger"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
}
