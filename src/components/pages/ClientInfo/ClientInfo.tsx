import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClient, updateClient } from "../../../api/api";
import { Card, Spinner } from "reactstrap";
import Forms from "../../Forms/Forms";
import Feedback from "../../Feedback/Feedback";

export default function ClientInfo() {
  const [clientInfo, setClientInfo]: any = useState({});
  const [load, setLoad] = useState(true);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const { id } = useParams();

  const updateThisClient = async (data: any) => {
    data = { ...data, id: clientInfo["id"] };
    const statusResponse = await updateClient(data);

    if (statusResponse === 200) {
      setModal(true);
    }
  };

  useEffect(() => {
    const loadClientInfo = async () => {
      const response = await getClient(id);
      setClientInfo(response.response);
      setLoad(false);
    };

    loadClientInfo();
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
    <>
      <Feedback
        modal={modal}
        toggle={() => toggle()}
        menssage="Cliente atualizado com sucesso!"
      />
      <Card className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <h1 className="text-center">Cadastro de cliente</h1>
        <Forms editable={clientInfo} handleSubmit={updateThisClient} />
      </Card>
    </>
  );
}
