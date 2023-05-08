import { useState, useEffect } from "react";
import { Form, FormGroup, Label, Row, Col, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputMask from "react-input-mask";
import { cpf } from "cpf-cnpj-validator";

const createUserFormSchemas = z.object({
  nome: z.string().nonempty("O nome é obrigatório!"),
  cpf: z
    .string()
    .nonempty("O cpf é obrigatório!")
    .refine((cpfInput) => {
      return cpf.isValid(cpfInput);
    }, "Cpf invalido!"),
  rg: z.string().nonempty("O rg é obrigatório!"),
  cep: z.string().nonempty("O cep é obrigatório!"),
  estado: z.string().nonempty("O estado é obrigatório!"),
  rua: z.string().nonempty("A rua é obrigatório!"),
  numero: z.string().nonempty("O número é obrigatório!"),
  bairro: z.string().nonempty("O bairro é obrigatório!"),
  cidade: z.string().nonempty("A cidade é obrigatório!"),
  celular: z.string().nonempty("O celular é obrigatório!"),
  telefone1: z.string(),
  telefone2: z.string(),
  email: z
    .string()
    .nonempty("O email é obrigatório!")
    .email("Formato de email inválido!"),
  data_nascimento: z.string().nonempty("A data de nascimento é obrigatória!"),
  professora: z.string().nonempty("A professora é obrigatório!"),
  data_matricula: z.string().nonempty("A data de matricula é obrigatória!"),
  responsavel: z.string(),
});

type createUserFormData = z.infer<typeof createUserFormSchemas>;

export default function Forms(props: any) {
  const [cepInfo, setCepInfo] = useState({
    bairro: "",
    complemento: "",
    localidade: "",
    logradouro: "",
    uf: "",
  });

  const [visible, setVisible] = useState("");

  useEffect(() => {
    if (props.editable) {
      const bornDate: any = new Date(props.editable.data_nascimento);
      const currentDate: any = new Date();
      const year = (currentDate - bornDate) / 31540000000;

      if (year) return year >= 18 ? setVisible("d-none") : setVisible("");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchemas),
  });

  const getCepInfo = async (e: any) => {
    await fetch(`https://viacep.com.br/ws/${e.target.value}/json/ `)
      .then((res) => res.json())
      .then((data) => {
        setCepInfo(data);
      });
  };

  const getBirthData = (props: any) => {
    const bornDate: any = new Date(props.target.value);
    const currentDate: any = new Date();
    const year = (currentDate - bornDate) / 31540000000;

    if (year) return year >= 18 ? setVisible("d-none") : setVisible("");
  };

  return (
    <Form onSubmit={handleSubmit(props.handleSubmit)}>
      <FormGroup className="col-sm-12">
        <Label htmlFor="name">Nome</Label>
        <input
          className="form-control"
          type="text"
          id="name"
          placeholder="Nome..."
          defaultValue={props.editable ? props.editable.nome : ""}
          {...register("nome")}
        />
        {errors.nome && (
          <span className="text-danger">{errors.nome.message}</span>
        )}
      </FormGroup>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="cpf">CPF</Label>
            <InputMask
              mask={"999.999.999-99"}
              maskChar={null}
              className="form-control"
              type="text"
              id="cpf"
              value={props.editable ? props.editable.cpf : ""}
              {...register("cpf")}
              placeholder="___.___.___-__"
            />
            {errors.cpf && (
              <span className="text-danger">{errors.cpf.message}</span>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="rg">RG</Label>
            <InputMask
              mask={"99.999.999"}
              maskChar={null}
              className="form-control"
              type="text"
              id="rg"
              value={props.editable ? props.editable.rg : ""}
              {...register("rg")}
              placeholder="__.___.___"
            />
            {errors.rg && (
              <span className="text-danger">{errors.rg.message}</span>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="cep">CEP</Label>
            <InputMask
              mask={"99999-999"}
              maskChar={null}
              className="form-control"
              type="text"
              id="cep"
              value={props.editable ? props.editable.cep : ""}
              {...register("cep")}
              placeholder="_____-__"
              onBlur={getCepInfo}
            />
            {errors.cep && (
              <span className="text-danger">{errors.cep.message}</span>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="estado">estado</Label>
            <input
              className="form-control"
              type="text"
              id="estado"
              defaultValue={props.editable ? props.editable.estado : cepInfo.uf}
              {...register("estado")}
              placeholder="Ex: MG"
            />
            {errors.estado && (
              <span className="text-danger">{errors.estado.message}</span>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="rua">Rua</Label>
            <input
              className="form-control"
              type="text"
              id="rua"
              defaultValue={
                props.editable ? props.editable.rua : cepInfo.logradouro
              }
              {...register("rua")}
              placeholder="Ex: rua, Av..."
            />
            {errors.rua && (
              <span className="text-danger">{errors.rua.message}</span>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="numero">Número</Label>
            <input
              className="form-control"
              type="text"
              id="numero"
              defaultValue={props.editable ? props.editable.numero : ""}
              {...register("numero")}
              placeholder="Ex: 420"
            />
            {errors.numero && (
              <span className="text-danger">{errors.numero.message}</span>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="bairro">Bairro</Label>
            <input
              className="form-control"
              type="text"
              id="bairro"
              defaultValue={
                props.editable ? props.editable.bairro : cepInfo.bairro
              }
              {...register("bairro")}
              placeholder="Ex: Abadia"
            />
            {errors.bairro && (
              <span className="text-danger">{errors.bairro.message}</span>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="cidade">Cidade</Label>
            <input
              className="form-control"
              type="text"
              id="cidade"
              defaultValue={
                props.editable ? props.editable.cidade : cepInfo.localidade
              }
              {...register("cidade")}
              placeholder="Ex: Uberaba"
            />
            {errors.cidade && (
              <span className="text-danger">{errors.cidade.message}</span>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="bairro">Celular</Label>
            <InputMask
              mask={"(99) 9 9999-9999"}
              maskChar={null}
              className="form-control"
              type="text"
              id="celular"
              value={props.editable ? props.editable.celular : ""}
              {...register("celular")}
              placeholder="(__) _ ____-____"
            />
            {errors.celular && (
              <span className="text-danger">{errors.celular.message}</span>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="telefone1">Telefone 1</Label>
            <InputMask
              mask={"(99) 9999-9999"}
              maskChar={null}
              className="form-control"
              type="text"
              id="telefone1"
              value={props.editable ? props.editable.telefone1 : ""}
              {...register("telefone1")}
              placeholder="(__) ____-____"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="telefone2">Telefone 2</Label>
            <InputMask
              mask={"(99) 9999-9999"}
              maskChar={null}
              className="form-control"
              type="text"
              id="telefone2"
              value={props.editable ? props.editable.telefone2 : ""}
              {...register("telefone2")}
              placeholder="(__) ____-____"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <input
              className="form-control"
              type="email"
              id="email"
              defaultValue={props.editable ? props.editable.email : ""}
              {...register("email")}
              placeholder="Ex: example@email.com"
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
            <input
              className="form-control"
              type="date"
              id="dataNascimento"
              defaultValue={
                props.editable
                  ? props.editable.data_nascimento?.substr(0, 10)
                  : ""
              }
              {...register("data_nascimento")}
              onBlur={getBirthData}
            />
            {errors.data_nascimento && (
              <span className="text-danger">
                {errors.data_nascimento.message}
              </span>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="professora">Professora</Label>
            <input
              className="form-control"
              type="text"
              id="professora"
              defaultValue={props.editable ? props.editable.professora : ""}
              {...register("professora")}
              placeholder="Ex: Elaine"
            />
            {errors.professora && (
              <span className="text-danger">{errors.professora.message}</span>
            )}
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label htmlFor="dataMatricula">Data de Matricula</Label>
        <input
          className="form-control"
          type="date"
          id="dataMatricula"
          defaultValue={
            props.editable ? props.editable.data_matricula?.substr(0, 10) : ""
          }
          {...register("data_matricula")}
        />
        {errors.data_matricula && (
          <span className="text-danger">{errors.data_matricula.message}</span>
        )}
      </FormGroup>
      <FormGroup className={visible}>
        <Label htmlFor="nomeResponsavel">Nome do responsavel</Label>
        <input
          className="form-control"
          type="text"
          id="nomeResponsavel"
          defaultValue={props.editable ? props.editable.responsavel : ""}
          {...register("responsavel")}
        />
        {errors.responsavel && (
          <span className="text-danger">{errors.responsavel.message}</span>
        )}
      </FormGroup>
      <Row className="p-4 d-sm-flex justify-content-center">
        <Button className="w-25">Cadastrar</Button>
      </Row>
    </Form>
  );
}
