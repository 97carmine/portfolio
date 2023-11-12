import { asset } from "$fresh/runtime.ts";

export default () => (
  <div class="container">
    <article id="resume" class="column">
      <h3 class="title is-3">Resume</h3>
      <hr />
      <h4 class="title is-4">Work experience</h4>
      <div class="content">
        <p>
          August 2022 - Present | ICT Project Manager in{" "}
          <a href="https://nascorformacion.com/" target="_blank">
            Nascor Formación
          </a>
          .
        </p>
        <ul>
          <li>
            Management of courses and certification exams to these courses of
            the platforms:{" "}
            <a
              href="https://www.netacad.com/portal/academy/62243#block-system-main"
              target="_blank"
            >
              Cisco Networking Academy
            </a>{" "}
            and Microsoft Learn for Education
          </li>
          <li>
            Microsoft Azure and Microsoft 365 tenant administrator
          </li>
        </ul>
        <p>
          July 2020 - December 2020 | Web development in{" "}
          <a href="https://www.aerin.es/" target="_blank">
            Aerín Sistemas
          </a>
          :
        </p>
        <ul>
          <li>Front-end development with ReactJS, Redux</li>
          <li>Back-end development with Django and API REST</li>
        </ul>
        <p>
          July 2017 - April 2018 | Technical tests and analysis in{" "}
          <a href="https://www.cgmtelecomunicaciones.es/" target="_blank">
            CGM Telecomunicaciones y acústica
          </a>
          :
        </p>
        <ul>
          <li>
            Customer service, inventory management of equipment belonging to
            Orange and documentation management
          </li>
        </ul>
      </div>
      <h4 class="title is-4">Studies</h4>
      <div class="content">
        <p>
          October 2019 - July 2020 | Técnico Superior en Desarrollo de
          Aplicaciones Web en{" "}
          <a href="https://www.jrotero.com/nuestro-centro/" target="_blank">
            Centro de Formación Profesional Cooperativa José Ramón Otero
          </a>
          .
        </p>
        <p>
          October 2017 - July 2019 | Técnico Superior en Sistemas
          Microinformáticos en Red en{" "}
          <a href="https://www.jrotero.com/nuestro-centro/" target="_blank">
            Centro de Formación Profesional Cooperativa José Ramón Otero
          </a>
          .
        </p>
      </div>
      <div class="content">
        <p>
          <a href={asset("/documents/CV.pdf")} target="_blank">
            PDF Resume
          </a>
          .
        </p>
      </div>
    </article>
  </div>
);
