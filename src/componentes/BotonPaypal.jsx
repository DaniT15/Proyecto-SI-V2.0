import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";


const PayPalButtoncomponent = () => {

    const navigate = useNavigate()



    const initialOptions = {

        "client-id": "AXfbHXHPy_0VdTOZxXrMBuVJ0uE60xQV4_GWS6iB1DzWsn54D0RZ5dVQt9JY9yT2zuTjgDSZlp_v3bxe",
        currency: "USD",
        intent: "capture",




    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "10.00",
                    },
                },
            ],

        })
    }


    const onAprove = (data, actions) => {
        return actions.order.capture().them(function(details){
            const name = details.payer.name.given_name
        
            console.log(name)
            console.log("")
            alert("Transacción completada por")
            navigate("/trasaccionexitosa")
        })
    }

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={onAprove} />
        </PayPalScriptProvider>
    )
}








export default function BotonPaypal() {
    return (
        <PayPalButtoncomponent />
    )
}
