import React from "react";
import { Nav, Navbar, Text } from "rsuite";
import pokemonLogo from "../../assets/pokemon-logo.png";
import styles from "./PokemonNavbar.module.css";
import ArowBackIcon from "@rsuite/icons/ArowBack";
import { useLocation, useNavigate } from "react-router-dom";
const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Navbar appearance="inverse" {...props}>
      <Navbar.Brand href="/">
        <div className={styles.navbarContainer}>
          <div className={styles.navbarLogo}>
            <img
              src={pokemonLogo}
              alt="Pokemon Logo"
              className={styles.navbarImg}
            />
            <Text className={styles.navbarText}>Pokemon</Text>
          </div>
        </div>
      </Navbar.Brand>

      {pathname !== "/" && (
        <Nav pullRight>
          <Nav.Item
            onClick={() => navigate(-1)}
            icon={<ArowBackIcon />}
          ></Nav.Item>
        </Nav>
      )}
    </Navbar>
  );
};

const PokeMonNavbar = () => {
  const [activeKey, setActiveKey] = React.useState(null);

  return (
    <>
      <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
    </>
  );
};

export default PokeMonNavbar;
