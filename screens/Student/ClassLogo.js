// Logo1.js
import React from "react";
import { SvgXml } from "react-native-svg";

const ClassLogo = () => {
    // Your SVG code or import statement here
    const svg =
        '<svg width="64px" height="64px" viewBox="-24 -24 72.00 72.00" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 5v14a1 1 45 0 0 1 1h16a1 1 135 0 0 1-1V5a1 1 45 0 0-1-1H4a1 1 135 0 0-1 1Z" style="opacity:1;fill:none;stroke:#000000;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"></path><path d="M14 18h4v2h-4z" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:2;stroke-miterlimit:4;stroke-dasharray:none"></path><path d="M12 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 .75c-1.001 0-3 .502-3 1.5V15h6v-.75c0-.998-1.999-1.5-3-1.5z" style="fill:#000000;stroke-width:.375"></path><path d="M15.75 10.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25zm0 2.813c-.17 0-.38.02-.602.058.203.235.352.537.352.879V15H18v-.563c0-.748-1.5-1.124-2.25-1.124zm-1.73.435c-.307.176-.52.407-.52.69v.062h1v-.25c0-.082-.032-.162-.168-.287a1.68 1.68 0 0 0-.312-.215zM8.25 10.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25zm0 2.813c-.75 0-2.25.376-2.25 1.124V15h2.5v-.75c0-.342.15-.644.352-.879a3.603 3.603 0 0 0-.602-.059zm1.73.435a1.68 1.68 0 0 0-.312.215c-.136.125-.168.205-.168.287v.25h1v-.063c0-.282-.213-.513-.52-.689z" style="fill:#000000;stroke-width:.28125"></path></g></svg>';

    return <SvgXml xml={svg} />;
};

export default ClassLogo;