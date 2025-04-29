import { useState } from "react";
import BackCard from "./components/BackCard";
import CardFront from "./components/FrontCard";
import { ToastContainer, toast } from 'react-toastify';
import instance from "./api/instance";

export default function app(){
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [mes, setMes] = useState("0");
  const [ano, setAno] = useState("0");
  const [cvv, setCvv] = useState("0");
  const [senha, setSenha] = useState("");

  async function pagar(){
   if(!nome || !numero || !mes || !ano || !cvv || !senha){
      return toast.error("preencha todos os campos")
   }

   if (numero.length !==16){
      return toast.error("Número do cartão inválido")
   }

   if (cvv.length !==3){
    return toast.error("CVV inválido")
   }

   if (ano.length !==2){
    return toast.error("Data de expiração inválida")
   }

   if ( mes > 12 || mes < 1){
    return toast.error("Data de expiração inválida")
   }

   if (senha.length < 4){
    return toast.error("Senha inválida")
   }

   try {
    const response = await instance.post("/creditcards", {
      name: nome,
      number: numero,
      expiration: `${mes}/${ano}`,
      cvv: cvv,
      password: senha
    })

    return toast.success("Pagamento realizado com sucesso")
   } catch (error) {
      return toast.error ("Erro ao processar o pagamento")
   }
  }

  return(
    <div className="w-full h-screen flex">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        theme="colored"
      />
      <div className="w-[40%] relative h-full bg-[#271540]">
          <div className="absolute top-10 left-60">
             <CardFront />
          </div>
          <div className="absolute top-[450px] left-[450px]">
             <BackCard />
          </div>
      </div>
      <div className="w-[60%] h-full flex items-end p-[40px] flex-col ">
        <h1 className="text-[45px] w-[70%] h-[150px] font-bold">Preencha os campos para concluir o pagamento!</h1>
        <div className="w-[65%] h-auto flex flex-col gap-4 min-h-[200px] ">
          <div className="w-full flex flex-col">
            <label htmlFor="nome" className="text-[20px]">Nome no cartão</label>
            <input 
            onChange={(event) => setNome(event.target.value)}
            type="text" 
            className="w-full h-[40px] rounded-md bg-[#d9d9d9]" />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="numero" className="text-[20px]">Número do cartão</label>
            <input 
            onChange={(event) => setNumero(event.target.value)}
            type="number" 
            className="w-full h-[40px] rounded-md bg-[#d9d9d9]" />
          </div>
          <div className="flex">
            <div className="w-[70%] flex flex-col ">
              <label htmlFor="" className="text-[20px]">Data de expiração</label>
              <div className="w-full flex gap-2">
                <input 
                onChange={(event) => setMes(event.target.value)}
                type="number" 
                placeholder="MM"
                className="w-[50%] pl-2 h-[40px] rounded-md bg-[#d9d9d9]"/>
                <input 
                onChange={(event) => setAno(event.target.value)}
                type="number" 
                placeholder="AA"
                className="w-[50%] pl-2 h-[40px] rounded-md bg-[#d9d9d9]"/>
              </div>
            </div>
            <div className="w-[30%] pl-2 flex flex-col ">
              <label htmlFor=""className="text-[20px]">CVV</label>
              <input 
              onChange={(event) => setCvv(event.target.value)}
              type="number" 
              className="w-full h-[40px] rounded-md bg-[#d9d9d9] pl-2"/>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="" className="text-[20px]">Senha do cartão</label>
            <input 
            onChange={(event) => setSenha(event.target.value)}
            type="password"
            className="w-full h-[40px] rounded-md pl-2 bg-[#d9d9d9]" />
          </div>
          <button 
          onClick={pagar}
          className="w-full h-[50px] rounded-md bg-[#271540] text-white font-bold ">Pagar</button>
        </div>
      </div>
    </div>

  )
}