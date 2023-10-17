import { FC } from 'react';
import { FooterSection } from 'shared/ui-kit/FooterSection/FooterSection';

import TelegramLogo from 'shared/assets/telegram-logo.png';
import VkLogo from 'shared/assets/vk-logo.png';
import cls from './FooterFeedback.module.css';

export const FooterFeedback: FC = () => {
  const openUrl = (url: string) => {
    window.open(url, '_blank')?.focus();
  };
  return (
    <FooterSection title='Обратная связь'>
      <div className={cls.icons}>
        <img onClick={() => { openUrl('https://t.me/my_career09'); }} className={cls.logo} src={TelegramLogo} alt=""/>
        <img onClick={() => { openUrl('https://vk.com/mycareer_09'); }} className={cls.vkLogo} src={VkLogo} alt=""/>
      </div>
      <div className={cls.links}>
        <a className={cls.link} href="tel: 8 800 550 90 44">8 800 550 90 44 доб. 444</a>
        <a className={cls.link} href="mailto: mail@resourcecenter09.ru">mail@resourcecenter09.ru</a>
        <a className={cls.link} href="mailto: support@minmolkchr.ru">support@minmolkchr.ru</a>
      </div>
    </FooterSection>
  );
};
