import React from 'react'

export default props => {
    return (
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 footer-info">
                            <h3>
                                {props.companyName}
                            </h3>
                            <p>
                                This is not real pizzeria site! I would love to make and deliver the best pizza in the city, but I have paws, sorry.
                            </p>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                    <a href="#">Terms of service</a>
                                </li>
                                <li>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                    <a href="#">Privacy policy</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-contact">
                            <h4>Contact Us</h4>
                            <p>
                                69 Pushkin street<br/>
                                Karaganda, 100000<br/>
                                Kazakhstan<br/>
                                <strong>Phone:</strong> +1 234 5678 90<br/>
                                <strong>Email:</strong> scilef@mail.ru<br/>
                            </p>

                            <div className="get-call">
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="copyright">
                    © Copyright <strong>BizPage</strong>. All Rights Reserved
                </div>
                <div className="credits">
                    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
            </div>
        </footer>
)
}
