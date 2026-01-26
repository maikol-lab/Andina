
const Contactareastart = () => {
    return (
        <div className="contact-area section-space">
            <div className="container">
                <div className="row g-5">
                    <div className="col-xxl-4 col-xl-4 col-lg-6">
                        <div className="contact-info-item text-center">
                            <div className="contact-info-icon">
                                <span><i className="fa-light fa-location-dot" /></span>
                            </div>
                            <div className="contact-info-content">
                                <h4>Our Location</h4>
                                <p><a href="#">House #5, Street Number #98, brasilia- 70000-000, Brazil.</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-6">
                        <div className="contact-info-item text-center">
                            <div className="contact-info-icon">
                                <span><i className="fa-light fa-envelope" /></span>
                            </div>
                            <div className="contact-info-content">
                                <h4>Our Email Address</h4>
                                <span><a href="mailto:contact@DOGRI.com">contact@DOGRI.com</a></span>
                                <span><a href="mailto:support@DOGRI.com">support@DOGRI.com</a></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-6">
                        <div className="contact-info-item text-center">
                            <div className="contact-info-icon">
                                <span><i className="fa-thin fa-phone" /></span>
                            </div>
                            <div className="contact-info-content">
                                <h4>Contact Phone Number</h4>
                                <span><a href="mailto:+380961381876">+380961381876</a></span>
                                <span><a href="mailto:+380961381877">+380961381877</a></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-wrapper pt-80">
                    <div className="row gy-50">
                        <div className="col-xxl-6 col-xl-6">
                            <div className="contact-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4216.433331900906!2d90.36996032419312!3d23.83718617432321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1693682874850!5m2!1sen!2sbd" />
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6">
                            <div className="contact-from">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="contact__from-input">
                                                <input type="text" placeholder="Full Name*" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="contact__from-input">
                                                <input type="text" placeholder="Email Address*" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="contact__from-input">
                                                <input type="tel" placeholder="Phone Number" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="contact__from-input">
                                                <input type="date" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="contact__select mb-20">
                                                <select>
                                                    <option value={0}>Pediatric Clinic</option>
                                                    <option value={2}>DOGRIsis Clinic</option>
                                                    <option value={3}>Cardiac Clinic</option>
                                                    <option value={1}>Medical Pharmacy</option>
                                                    <option value={1}>Rehabilitation Therapy</option>
                                                    <option value={1}>Laryngological Clinic</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="contact__select mb-20">
                                                <select>
                                                    <option value={0}>Choose Doctor</option>
                                                    <option value={2}>Dr. Jalen Kothenbeutel</option>
                                                    <option value={3}>Dr. Jade Dayal</option>
                                                    <option value={1}>Dr. Zander Nishida</option>
                                                    <option value={1}>Dr. Mattie Tellers</option>
                                                    <option value={1}>Dr. Jade Dayal </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="contact__from-input">
                                                <textarea name="Message" placeholder="Your Message" defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="appointment__btn">
                                                <button className="fill-btn" type="submit">
                                                    <span className="fill-btn-inner">
                                                        <span className="fill-btn-normal">send now<i className="fa-regular fa-angle-right" /></span>
                                                        <span className="fill-btn-hover">send now<i className="fa-regular fa-angle-right" /></span>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Contactareastart;
