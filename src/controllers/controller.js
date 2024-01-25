import mercadopago from 'mercadopago';

export const createOrder = async (req, res) => {

    mercadopago.configure({
        integrator_id: "INTEGRATOR_ID",
        access_token: "ACCESS_TOKEN",
    });

    const result = await mercadopago.preferences.create({
        items: [
            {
                id: '1234',
                title: 'iPhone 12',
                description: 'Dispositivo móvil de Tienda e-commerce',
                picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
                quantity: 1,
                unit_price: 10000,
                currency_id: 'ARS',
            }
        ],
        
        back_urls: {
            success: 'http://localhost:3000/success',
            failure: 'http://localhost:3000/failure',
            pending: 'http://localhost:3000/pending',
        },
        notification_url: 'NOTIFICATION_URL',
        external_reference: 'petermessi754@gmail.com',
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: 'visa',
                }
            ],
            excluded_payment_types: [
                {
                    id: 'visa',
                }
            ],
            installments: 6,
        },
        payer: {
            name: 'Lalo',
            surname: 'Landa',
            email: 'test_user_36961754@testuser.com',
            phone: {
                area_code: '11',
                number: 22223333,
            },
            address: {
                zip_code: '1640',
                street_name: 'calle falsa',
                street_number: 123,
            }
        },

    })
    
    console.log(result);

    res.send(result.body)
};

export const receiveWebhook = async (req, res) => {
    try {
      const payment = req.query;
      console.log(payment);
      if (payment.type === "payment") {
        const data = await mercadopage.payment.findById(payment["data.id"]);
        console.log(data);
      }
  
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
