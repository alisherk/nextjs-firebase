import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='content'>
      <Navbar />
        {children}
      <Footer />
    </div>
  );
};

export default Layout;
