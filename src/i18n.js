/*!
 *  File    : i18n.js
 *  Created : 2021-07-06
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  eXeLearning repo
 *  Embeddable front-end for a repository of eXeLearning resources
 *  https://projectes.xtec.cat/exelearning
 *
 *  @source https://github.com/projectestac/exelearning-repo
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2021 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */

import i18n from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

/**
 * Initializes the i18n system
 * See https://www.i18next.com/overview/api for detailed options
 * @param {object} options
 * @returns {object} - the [i18n](https://www.i18next.com) main object
 */
export default function i18nInit({ langKey = 'lang', langDefault = 'en' }) {
  return i18n
    .use(LngDetector)
    .use(initReactI18next)
    .init({
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
        lookupQuerystring: langKey,
        lookupLocalStorage: 'i18nextLng',
      },
      resources: {
        en: {
          translation: {
            title: "eXeLearning library",
            description: "Collection of open educational resources created with eXeLearning",
            author: "Catalonia Department of Education",
            loading: "Loading data...",
            projects_count: "Found {{count}} project",
            projects_count_plural: "Found {{count}} projects",
            view_mode: "View mode",
            view_mode_cards: "View project cards",
            view_mode_list: "View as list",
            results_per_page: "Results per page:",
            results_count: "Results {{from}} to {{to}} of {{count}}",
            results_page_prev: "Previous page",
            results_page_next: "Next page",
            cover_alt: "Project's cover",
            prj_authors: "Created by",
            prj_languages: "Languages",
            prj_levels: "Levels",
            prj_subjects: "Subjects",
            prj_tags: "Tags",
            prj_date: "Date",
            prj_license: "License",
            prj_launch: "Show",
            prj_launch_tooltip: "Show the resource on a new tab",
            prj_elp: "Download ELP",
            prj_elp_tooltip: "Download resource in eXeLearning format (ELP)",
            prj_scorm: "Download SCORM",
            prj_scorm_tooltip: "Download resource in SCORM format",
            share_twitter: "Share on twitter",
            share_facebook: "Share on Facebook",
            share_telegram: "Share on Telegram",
            share_whatsapp: "Share on WhatsApp",
            share_pinterest: "Share on Pinterest",
            share_email: "Send by e-mail",
            share_classroom: "Add to Google Classroom",
            error_unknown_id: "No project exists with id \"{{id}}\"",
            error_no_source: "The CSV file location has not been specified",
            error_network: "Unable to download data: {{code}} {{text}}",
            error_bad_data: "Incorrect data",
          },
        },
        ca: {
          translation: {
            title: "Biblioteca eXeLearning",
            description: "Recull de recursos educatius oberts creats amb eXeLearning",
            author: "Departament d'Educació de la Generalitat de Catalunya",
            loading: "S'estan carregant les dades...",
            projects_count: "S'ha trobat {{count}} projecte",
            projects_count_plural: "S'han trobat {{count}} projectes",
            view_mode: "Tipus de visualització",
            view_mode_cards: "Mostra targetes de projecte",
            view_mode_list: "Mostra en una llista",
            results_per_page: "Resultats per pàgina:",
            results_count: "Resultats {{from}} a {{to}} de {{count}}",
            results_page_prev: "Pàgina anterior",
            results_page_next: "Pàgina següent",
            cover_alt: "Caràtula del projecte",
            prj_authors: "Creat per",
            prj_languages: "Idiomes",
            prj_levels: "Etapes",
            prj_subjects: "Àrees",
            prj_tags: "Descriptors",
            prj_date: "Data de publicació",
            prj_license: "Llicència d'ús",
            prj_launch: "Mostra",
            prj_launch_tooltip: "Mostra el recurs en una pestanya nova",
            prj_elp: "Fitxer ELP",
            prj_elp_tooltip: "Descarrega en format eXeLearning (ELP)",
            prj_scorm: "Fitxer SCORM",
            prj_scorm_tooltip: "Descarrega en format SCORM",
            share_twitter: "Comparteix a Twitter",
            share_facebook: "Comparteix a Facebook",
            share_telegram: "Comparteix a Telegram",
            share_whatsapp: "Comparteix a WhatsApp",
            share_pinterest: "Comparteix a Pinterest",
            share_email: "Envia per correu electrònic",
            share_classroom: "Afegeix a Google Classroom",
            error_unknown_id: "No existeix cap projecte amb l'identificador \"{{id}}\"",
            error_no_source: "No s'ha especificat la ubicació del fitxer CSV",
            error_network: "No es poden llegir les dades: {{code}} {{text}}",
            error_bad_data: "Dades incorrectes",
          },
        },
        es: {
          translation: {
            title: "Biblioteca eXeLearning",
            description: "Colección de recursos educativos abiertos creados con eXeLearning",
            author: "Departamento de Educación de la Generalitat de Catalunya",
            loading: "Cargando datos...",
            projects_count: "Se ha encontrado {{count}} proyecto",
            projects_count_plural: "Se han encontrado {{count}} proyectos",
            view_mode: "Tipo de visualización",
            view_mode_cards: "Mostrar tarjetas de proyecto",
            view_mode_list: "Mostrar en una lista",
            results_per_page: "Resultados por página:",
            results_count: "Resultados {{from}} al {{to}} de {{count}}",
            results_page_prev: "Página anterior",
            results_page_next: "Página siguiente",
            cover_alt: "Carátula del proyecto",
            prj_authors: "Creado por",
            prj_languages: "Idiomas",
            prj_levels: "Etapas",
            prj_subjects: "Areas",
            prj_tags: "Descriptores",
            prj_date: "Fecha de publicación",
            prj_license: "Licencia de uso",
            prj_launch: "Mostrar",
            prj_launch_tooltip: "Mostrar el recurso en una nueva pestaña",
            prj_elp: "Archivo ELP",
            prj_elp_tooltip: "Descargar en formato eXeLearning (ELP)",
            prj_scorm: "Archivo SCORM",
            prj_scorm_tooltip: "Descargar en formato SCORM",
            share_twitter: "Compartir en Twitter",
            share_facebook: "Compartir en Facebook",
            share_telegram: "Compartir en Telegram",
            share_whatsapp: "Compartir en WhatsApp",
            share_pinterest: "Compartir en Pinterest",
            share_email: "Enviar por correo electrónico",
            share_classroom: "Añadir a Google Classroom",
            error_unknown_id: "No existe ningún proyecto con el identificador \"{{id}}\"",
            error_no_source: "No se ha especificado la ubicación del archivo CSV",
            error_network: "No se han podido descargar los datos: {{code}} {{text}}",
            error_bad_data: "Datos incorrectos",
          },
        },
      },
      fallbackLng: langDefault,
      interpolation: {
        escapeValue: false,
      },
    });
}
