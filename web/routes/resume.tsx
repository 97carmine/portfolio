import { PageProps } from "$fresh/server.ts";
import { asset, IS_BROWSER } from "$fresh/runtime.ts";
import Page from "~/components/page.tsx";

export default (props: PageProps) => {
  const meta = {
    title: "Resume",
    canonical: IS_BROWSER ? document.location.href : props.url.href,
    description: "Page not found",
  };

  return (
    <Page {...meta}>
      <section class="section">
        <div class="container">
          <h1 class="title is-1">Resume</h1>
          <hr />
          <article>
            <h2 class="title">Work experience</h2>
            <div class="content">
              <p>
                August 2022 - Present | ICT Project Manager in{" "}
                <a href="https://nascorformacion.com/" target="_blank">
                  Nascor Formación
                </a>
                .
              </p>
              <ul></ul>
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
                  Customer service, inventory management of equipment belonging
                  to Orange and documentation management
                </li>
              </ul>
            </div>
            <h2 class="title">Studies</h2>
            <div class="content">
              <p>
                October 2019 - July 2020 | Técnico Superior en Desarrollo de
                Aplicaciones Web en{" "}
                <a
                  href="https://www.jrotero.com/nuestro-centro/"
                  target="_blank"
                >
                  Centro de Formación Profesional Cooperativa José Ramón Otero
                </a>
                .
              </p>
              <p>
                October 2017 - July 2019 | Técnico Superior en Sistemas
                Microinformáticos en Red en{" "}
                <a
                  href="https://www.jrotero.com/nuestro-centro/"
                  target="_blank"
                >
                  Centro de Formación Profesional Cooperativa José Ramón Otero
                </a>
                .
              </p>
            </div>
            <div class="content">
              <p>
                PDF version available{" "}
                <a href={asset("/documents/CV.pdf")} target="_blank">
                  here
                </a>
                .
              </p>
            </div>
          </article>
        </div>
      </section>
    </Page>
  );
};
