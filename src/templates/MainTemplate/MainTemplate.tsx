import { defineScripts, defineStyles } from '../../page';
import { Footer } from './components/Footer';
import Header from './components/Header';
import TopBar from './components/TopBar';

type MainTemplateProps = {
  children: any[];
  showHead?: boolean;
};

export default function MainTemplate({
  children,
  showHead = true,
}: MainTemplateProps) {
  defineStyles([
    {
      innerHTML: '@content(src/assets/styles/base.css)',
    },
  ]);
  defineScripts([
    {
      src: '@source(src/templates/MainTemplate/MainTemplate.script.ts)',
      defer: true,
    },
  ]);
  return (
    <section>
      <div class='hero' data-theme='dark'>
        <TopBar />
        {showHead && <Header />}
      </div>
      <main class='container'>{children}</main>
      <Footer />
    </section>
  );
}
