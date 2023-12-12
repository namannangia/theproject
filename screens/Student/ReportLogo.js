// Logo1.js
import React from "react";
import { SvgXml } from "react-native-svg";

const ReportLogo = () => {
    // Your SVG code or import statement here
    const svg =
        '<svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="-32 -32 96.00 96.00" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .afiado_een{fill:#0B1719;} </style> <path class="afiado_een" d="M6,11h4v17H6V11z M22,16v12h4V16H22z M14,28h4V4h-4V28z"></path> </g></svg>';

    return <SvgXml xml={svg} />;
};

export default ReportLogo;
