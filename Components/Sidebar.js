import React from 'react';
/* Import library für Sidebar */
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

/* Import für Router library */
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

/* Seiten Importieren */
import Kurse from '../Sites/Kurse/Dashboard';
import KurseEdit from '../Sites/Kurse/KurseEdit';
import KurseAdd from '../Sites/Kurse/KurseAdd';
import Home from '../Sites/Home';
import Dozenten from '../Sites/Dozenten/Dashboard';
import DozentenEdit from '../Sites/Dozenten/DozentenEdit';
import DozentenAdd from '../Sites/Dozenten/DozentenAdd';
/*import Laender from '../Sites/Laender';
import Lehrbetriebe from '../Sites/Lehrbetrieb';
import Lernende from '../Sites/Lernende';
import Dozenten from '../Sites/Dozenten';
import Kurs_lernende from '../Sites/Kurs_lernende';
import Lehrbetrieb_lernende from '../Sites/Lehrbetrieb_lernende';*/

/* Hier wird die Sidebar erstellt. Ebenso wird hier der Router für die Seiten erstellt. Alle neuen Routen müssen hier definiert werden.*/
const Sidebar = () => {
   return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial'}}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Menu
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/kurse" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Kurse</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dozenten" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dozenten</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/laender" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Laender</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/lehrbetrieb" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Lehrbetrieb</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/lernende" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Lernende</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/kurse_lernende" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Kurse_lernende</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/lehrbetrieb_lernende" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Lehrbetrieb_lernende</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
      <Routes>
         <Route exact path="/" element={<Home />} />
         <Route exact path="/kurse" element={<Kurse />} />
         <Route path="/kurse/edit/:id" element={<KurseEdit />} />
         <Route path="/kurse/add/" element={<KurseAdd />} />
         <Route exact path="/dozenten" element={<Dozenten />} />
         <Route exact path="/dozenten/edit/:id" element={<DozentenEdit />} />
         <Route exact path="/dozenten/add" element={<DozentenAdd />} />
      </Routes>
    </div>
  );
};

export default Sidebar;