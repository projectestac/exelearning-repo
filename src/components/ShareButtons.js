import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { mergeClasses } from '../utils';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

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

// Google Classroom icon
export const GClassroomIcon = () =>
  <SvgIcon viewBox="0 0 48 48">
    <path d="M41 42H7c-2.207 0-4-1.793-4-4V10c0-2.207 1.793-4 4-4h34c2.207 0 4 1.793 4 4v28c0 2.207-1.793 4-4 4z" fill="#FFC107" />
    <path d="M7 10h34v28H7z" fill="#388E3C" /><path d="M28 36h8v2h-8zM27 20a3 3 0 11-6.002-.002A3 3 0 0127 20z" fill="#FFF" />
    <path d="M18 23a1.999 1.999 0 11-4 0 1.999 1.999 0 114 0z" fill="#A5D6A7" />
    <path d="M7 10h34v2H7z" fill="#2E7D32" /><path d="M36 38h-8l4 4h8z" fill="#FFAB00" />
    <path d="M34 23a1.999 1.999 0 11-4 0 1.999 1.999 0 114 0zM37 28.688c0-.446-.164-.875-.469-1.2C35.84 26.75 34.363 26 32 26c-2.363 0-3.84.75-4.531 1.488a1.747 1.747 0 00-.469 1.2V30h10zM21 28.688c0-.446-.164-.875-.469-1.2C19.84 26.75 18.363 26 16 26c-2.363 0-3.84.75-4.531 1.488a1.747 1.747 0 00-.469 1.2V30h10z" fill="#A5D6A7" />
    <path d="M30 27.742c0-.535-.195-1.047-.563-1.437C28.605 25.418 26.837 24 24 24c-2.836 0-4.605 1.418-5.438 2.305A2.08 2.08 0 0018 27.742V30h12z" fill="#FFF" />
  </SvgIcon>;

const E = encodeURIComponent;

export default function ShareButtons({ link, titol, descripcio, imatge, emailBody = null, settings, t, ...props }) {

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
              <GClassroomIcon />
            </IconButton>
          </a>
        }
      </div>
    </div>
  );
}