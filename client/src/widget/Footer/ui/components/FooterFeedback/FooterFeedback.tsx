import { FC } from 'react';
import { FooterSection } from 'shared/ui-kit/FooterSection/FooterSection';

import TelegramLogo from 'shared/assets/telegram-logo.png';
import VkLogo from 'shared/assets/vk-logo.png';
import cls from './FooterFeedback.module.css';

export const FooterFeedback: FC = () => {
  return (
    <FooterSection title='Обратная связь'>
      <div className={cls.icons}>
        <img className={cls.logo} src={TelegramLogo} alt=""/>
        <img className={cls.vkLogo} src={VkLogo} alt=""/>
      </div>
      <div className={cls.links}>
        <a className={cls.link} href="tel: 8 (800) 333-77-37">8 (800) 333-77-37</a>
        <a className={cls.link} href="mailto: my_carier@gmail.com">my_carier@gmail.com</a>
        <a className={cls.link} href="mailto: support_carier@gmail.com">support_carier@gmail.com</a>
      </div>
    </FooterSection>
  );
};
