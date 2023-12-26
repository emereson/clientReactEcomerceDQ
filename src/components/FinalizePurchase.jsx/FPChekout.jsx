import React, { useEffect } from 'react';
import axios from 'axios';

const FPChekout = () => {
  //   const callbackResponsePayment = (response) => console.log(response);

  try {
    checkout &&
      checkout.LoadForm({
        authorization: '4103d2ecc9444f488010641104b70bc9',
        // keyRSA: 'TU_KEY_RSA',
        // callbackResponse: callbackResponsePayment,
      });
  } catch (error) {
    console.log(error.message, error.Errors, error.date);
  }

  /* Enviando en el iziConfig showButtonProcessForm: false */

  //   let btnPayNow = document.querySelector('#boton-comercio');

  //   btnPayNow.addEventListener('click', async (event) => {
  //     event.preventDefault();

  //     checkout.form.events.submit();
  //   });

  const createPay = () => {
    const url = `https://testapi-pw.izipay.pe
/security/v1/Token/Generate`;

    axios
      .post(url)
      .then((res) => {
        console.log(res.data);
        const iziConfig = {
          config: {
            transactionId: res.formToken,
            action: 'pay',
            merchantCode: '123213212312',
            order: {
              orderNumber: '21312123123',
              currency: 'PEN',
              amount: '1.50',
              processType: 'AT',
              merchantBuyerId: '2132132213112',
              dateTimeTransaction: '1670258741603000',
            },
            billing: {
              firstName: 'Juan',
              lastName: 'Wick Quispe',
              email: 'jwickq@izi.com',
              phoneNumber: '958745896',
              street: 'Av. Jorge Chávez 275',
              city: 'Lima',
              state: 'Lima',
              country: 'PE',
              postalCode: '15038',
              documentType: 'DNI',
              document: '21458796',
            },
            render: {
              typeForm: 'embedded',
              container: 'my-form-payment',
              showButtonProcessForm: true,
            },
          },
        };
        const checkout = new Izipay({ config: iziConfig });
        console.log(checkout);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div id="my-form-payment">
      <button id="boton-comercio" onClick={createPay}>
        sssas
      </button>
    </div>
  );
};

export default FPChekout;
