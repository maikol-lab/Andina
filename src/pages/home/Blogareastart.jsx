import React from 'react'

const Blogareastart = () => {
    return (
        <section className="blog-area theme-bg-2 section-space">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xxl-4 col-xl-4 col-lg-4">
                        <div className="section-title-wrapper-4 text-center section-title-space">
                            <span className="section-subtitle-4 mb-10">Read blog</span>
                            <h2 className="section-title-4">Recent Blog</h2>
                        </div>
                    </div>
                </div>
                <div className="row gy-5">
                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                        <div className="blog-item-4 furniture__blog-item">
                            <div className="blog-content-4">
                                <div className="blog-tag-wrapper mb-15">
                                    <a className="blog-tag" href="#">Chair Design</a>
                                </div>
                                <div className="postbox__meta mb-15">
                                    <span><a href="#">By Alex Manie</a></span>
                                    <span>07 jan, 2024</span>
                                </div>
                                <h4 className="blog-title">
                                    <a href="blog-details.html" className="text-capitalize">arrangement that's nearly perfect.</a>
                                </h4>
                                <a className="round-link" href="blog-details.html"><i className="fa-regular fa-angle-right" /></a>
                            </div>
                            <div className="blog-item-thumb w-img">
                                <a href="blog-details.html">
                                    <img src="/imgs/furniture/blog/blog-image1.jpg" alt />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                        <div className="blog-item-4 furniture__blog-item">
                            <div className="blog-content-4">
                                <div className="blog-tag-wrapper mb-15">
                                    <a className="blog-tag" href="#">Sofa Design</a>
                                </div>
                                <div className="postbox__meta mb-15">
                                    <span><a href="#">By Alex Manie</a></span>
                                    <span>07 jan, 2024</span>
                                </div>
                                <h4 className="blog-title">
                                    <a href="blog-details.html" className="text-capitalize">Eworkstation arrangement that's</a>
                                </h4>
                                <a className="round-link" href="blog-details.html"><i className="fa-regular fa-angle-right" /></a>
                            </div>
                            <div className="blog-item-thumb-4 w-img">
                                <a href="blog-details.html">
                                    <img src="/imgs/furniture/blog/blog-image2.jpg" alt />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Blogareastart;
