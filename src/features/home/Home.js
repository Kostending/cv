// Move this file to feature folder along with styling

import profilePic from '../../assets/anders.jpg';

import styles from './Home.module.css';

export const Home = function () {
    return (
        <div id="home-container" className="container">
            <div className="container-row">
                <h1>Anders Kostending, 27</h1>
            </div>

            <div className="container-row">
                <div className="item">
                    <img id={styles.profilePic} alt="Me" src={profilePic}/>
                </div>
                <div className="item">
                    <h1>About me</h1>
                    <div id="about-me">
                        <p>I live in Hadsten, Denmark, with my girlfriend Stine and son Sylvester. We resently became
                            both
                            houseowners and parents, so when we are not stopping Sylvester from causing trouble, we are
                            fixing up the house.</p>
                        <p>I'm a passionate software devoloper that loves deep diving into new projects and
                            technologies. I
                            always wish to deliver the best possible project, both in regards to user experience an
                            stability.</p>
                        <p>As a developer, I ..</p>
                        <ul>
                            <li>.. have eye for the details</li>
                            <li>.. put quality first</li>
                            <li>.. socialize with my colegues and I am always ready to help plan cozy evenings and fun
                                parties
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}


