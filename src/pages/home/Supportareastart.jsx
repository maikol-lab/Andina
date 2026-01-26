import React from 'react'

const Supportareastart = () => {
    return (
        <section className="support-area section-space pb-0">
            <div className="container">
                <div className="row g-5">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                        <div className="support-item">
                            <div className="support-content">
                                <h3>Exclusive offers for you</h3>
                                <p>Get weekly deals, valuable health information and more.</p>
                                <a className="join-btn furniture-btn" href="#">sing up<span><i className="fa-regular fa-angle-right" /></span></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                        <div className="support-item is-light-yellow">
                            <div className="support-content">
                                <h3>Join Our Community</h3>
                                <p>Get weekly deals, valuable health information and more.</p>
                                <a className="join-btn furniture-btn" href="#">Join FREE now<span><i className="fa-regular fa-angle-right" /></span></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                        <div className="support-item is-pale-pink">
                            <div className="support-content">
                                <h3>Get our FREE app Now!</h3>
                                <p>Get weekly deals, valuable health information and more.</p>
                                <div className="mobile__app-download">
                                    <a className="app__download" href="#">
                                        <img src="/imgs/app/play-store.png" alt="image not found" />
                                    </a>
                                    <a className="app__download" href="#">
                                        <img src="/imgs/app/apple-store.png" alt="image not found" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Supportareastart;
