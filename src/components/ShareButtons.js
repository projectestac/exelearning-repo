/*!
 *  File    : components/ShareButtons.js
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

import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { mergeClasses } from '../utils';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ClassroomIcon from '../assets/classroom.svg';

const useStyles = makeStyles(_theme => ({
  root: {
    position: 'relative',
  },
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    "& button": {
      marginLeft: '-0.6rem',
    },
    "& svg": {
      width: '24px',
      height: '24px',
    },
  },
  twitter: {
    color: '#01acee',
  },
  facebook: {
    color: '#3c5a98',
  },
  telegram: {
    color: '#37aee2',
  },
  whatsapp: {
    color: '#2cb842',
  },
  pinterest: {
    color: '#cb2128',
  },
  email: {
    color: '#0a5191',
  },
}));

const E = encodeURIComponent;

/**
 * This component encapsulates buttons for sharing an eXeLearning project on different social networks
 * The `shareSites` allows to enable or disable specific social networks
 * @param {object} params
 * @returns 
 */
function ShareButtons({ link, titol, descripcio, imatge, emailBody = null, settings, t, ...props }) {

  const {
    shareSites: { twitter, facebook, telegram, whatsapp, pinterest, email, classroom },
    shareMeta: { hash, via },
    facebookId,
  } = settings;
  const classes = mergeClasses(props, useStyles());

  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        {twitter && titol && link &&
          <a
            href={`https://twitter.com/intent/tweet?text="${E(titol)}"&url=${E(link)}${hash ? `&hashtags=${E(hash)}` : ''}${via ? `&via=${E(via)}` : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.twitter}>
            <IconButton aria-label={t('share_twitter')} title={t('share_twitter')} color="inherit">
              <TwitterIcon />
            </IconButton>
          </a>
        }
        {facebook && titol && link &&
          <a
            href={`https://www.facebook.com/dialog/feed?app_id=${facebookId}&link=${E(link)}${imatge ? `&picture=${E(imatge)}` : ''}&name=${E(titol)}${descripcio ? `&description=${E(descripcio)}` : ''}&redirect_uri=${E('https://facebook.com')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.facebook}>
            <IconButton aria-label={t('share_facebook')} title={t('share_facebook')} color="inherit">
              <FacebookIcon />
            </IconButton>
          </a>
        }
        {telegram && titol && link &&
          <a
            href={`https://telegram.me/share/url?url=${E(link)}&text=${E(`${titol}\n${descripcio || ''}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.telegram} >
            <IconButton aria-label={t('share_telegram')} title={t('share_telegram')} color="inherit">
              <TelegramIcon />
            </IconButton>
          </a>}
        {whatsapp && titol && link &&
          <a
            href={`https://api.whatsapp.com/send?text=${E(`${titol}\n${link}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.whatsapp} >
            <IconButton aria-label={t('share_whatsapp')} title={t('share_whatsapp')} color="inherit">
              <WhatsAppIcon />
            </IconButton>
          </a>
        }
        {pinterest && imatge && titol && link &&
          <a
            href={`https://pinterest.com/pin/create/button/?url=${E(link)}&media=${E(imatge)}&description=${E(titol)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.pinterest} >
            <IconButton aria-label={t('share_pinterest')} title={t('share_pinterest')} color="inherit">
              <PinterestIcon />
            </IconButton>
          </a>
        }
        {email && titol &&
          <a
            href={`mailto:?subject=${E(titol)}&body=${E(emailBody || `${titol}\n\n${descripcio || ''}\n\n${link}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.email}>
            <IconButton aria-label={t('share_email')} title={t('share_email')} color="inherit">
              <EmailIcon />
            </IconButton>
          </a>
        }
        {classroom && link &&
          <a
            href={`https://classroom.google.com/u/0/share?url=${E(link)}`}
            target="_blank"
            rel="noopener noreferrer">
            <IconButton aria-label={t('share_classroom')} title={t('share_classroom')} >
              <ClassroomIcon />
            </IconButton>
          </a>
        }
      </div>
    </div>
  );
}

export default ShareButtons;
