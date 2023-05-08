/*
    TODO 
* 
*   [ ] validação / transformação
*   [x] cadastrar no banco
*
*/
import { useState } from "react";
import { setClient } from "../../../api/api";
import Feedback from "../../Feedback/Feedback";
import { Card } from "reactstrap";
import Forms from "../../Forms/Forms";

export default function Cadastro() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const createClient = async (data: any) => {
    const statusResponse = await setClient(data);

    if (statusResponse === 200) {
      setModal(true);
    }
  };

  return (
    <div>
      <Feedback
        modal={modal}
        toggle={() => toggle()}
        menssage="Cliente adcionado com sucesso!"
      />
      <Card className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <h1 className="text-center">Cadastro de cliente</h1>
        <Forms handleSubmit={createClient} />
      </Card>
    </div>
  );
}
