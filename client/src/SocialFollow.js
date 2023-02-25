import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faMeta } from "@fortawesome/free-brands-svg-icons";

function SocialFollow() {
  return (
    <div className="social-container">
      <h3>Ink Junky Social Links</h3>
      <a
        href="https://www.facebook.com/thainkjunky.tymiller"
        className="facebook social"
      >
        <FontAwesomeIcon icon={faMeta} size="2x" />
      </a>
      <a
        href="https://www.instagram.com/Ty_thainkjunky_miller/?fbclid=IwAR1unzaJn1bYmzamV58ZlEIJqUhEcacSYwNeWY7zdV6w86tqx2uqiiubATo"
        className="instagram social"
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
  );
}

export default SocialFollow;
