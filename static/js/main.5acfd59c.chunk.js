(this["webpackJsonp@prosky/invoice.app"]=this["webpackJsonp@prosky/invoice.app"]||[]).push([[0],{210:function(e,a){},212:function(e,a){},242:function(e,a){},243:function(e,a){},518:function(e,a,t){},519:function(e,a,t){"use strict";t.r(a);var n=t(3),i=t(8),l=t.n(i),o=t(57),r=t.n(o),u=t(203),s=t(16),c=t(32),d={description:"",quantity:"1",rate:"0.00"},x={title:"INVOICE",companyName:"",name:"",companyAddress:"",companyAddress2:"",companyCountry:"United States",billTo:"Bill To:",clientName:"",clientAddress:"",clientAddress2:"",clientCountry:"United States",invoiceTitleLabel:"Invoice#",invoiceTitle:"",invoiceDateLabel:"Invoice Date",invoiceDate:"",invoiceDueDateLabel:"Due Date",invoiceDueDate:"",productLineDescription:"Item Description",productLineQuantity:"Qty",productLineQuantityRate:"Rate",productLineQuantityAmount:"Amount",productLines:[{description:"Brochure Design",quantity:"2",rate:"100.00"},Object(s.a)({},d),Object(s.a)({},d)],subTotalLabel:"Sub Total",taxLabel:"Sale Tax (10%)",totalLabel:"TOTAL",currency:"$",notesLabel:"Notes",notes:"It was great doing business with you.",termLabel:"Terms & Conditions",term:"Please make the payment by the due date."},v=t(12),p="#e3e3e3",b={dark:{color:"#222"},white:{color:"#fff"},"bg-dark":{backgroundColor:"#666"},"bg-gray":{backgroundColor:p},flex:{display:"flex",flexDirection:"row",flexWrap:"nowrap"},"w-auto":{flex:1,paddingRight:"8px"},"ml-30":{flex:1},"w-100":{width:"100%"},"w-50":{width:"50%"},"w-55":{width:"55%"},"w-45":{width:"45%"},"w-60":{width:"60%"},"w-40":{width:"40%"},"w-48":{width:"48%"},"w-17":{width:"17%"},"w-18":{width:"18%"},row:{borderBottom:"1px solid ".concat(p)},"mt-40":{marginTop:"40px"},"mt-30":{marginTop:"30px"},"mt-20":{marginTop:"20px"},"mt-10":{marginTop:"10px"},"mb-5":{marginBottom:"5px"},"p-4-8":{padding:"4px 8px"},"p-5":{padding:"5px"},"pb-10":{paddingBottom:"10px"},right:{textAlign:"right"},bold:{fontWeight:"bold"},"fs-20":{fontSize:"20px"},"fs-45":{fontSize:"45px"},page:{fontFamily:"Nunito",fontSize:"13px",color:"#555",padding:"40px 35px"},span:{padding:"4px 12px 4px 0"}},h=function(e){var a={};return e.replace(/\s+/g," ").split(" ").forEach((function(e){void 0!==typeof b[e]&&Object.assign(a,b[e])})),a},j=function(e){var a=e.className,t=e.placeholder,i=e.value,l=e.onChange,o=e.pdfMode;return Object(n.jsx)(n.Fragment,{children:o?Object(n.jsx)(v.Text,{style:h("span "+(a||"")),children:i}):Object(n.jsx)("input",{type:"text",className:"input "+(a||""),placeholder:t||"",value:i||"",onChange:l?function(e){return l(e.target.value)}:void 0})})},m=function(e){var a=e.className,t=e.options,l=e.placeholder,o=e.value,r=e.onChange,u=e.pdfMode,s=Object(i.useState)(!1),d=Object(c.a)(s,2),x=d[0],p=d[1];return Object(n.jsx)(n.Fragment,{children:u?Object(n.jsx)(v.Text,{style:h("span "+(a||"")),children:o}):Object(n.jsx)(n.Fragment,{children:x?Object(n.jsx)("select",{className:"select "+(a||""),value:o,onChange:r?function(e){return r(e.target.value)}:void 0,onBlur:function(){return p(!1)},autoFocus:!0,children:null===t||void 0===t?void 0:t.map((function(e){return Object(n.jsx)("option",{value:e.value,children:e.text},e.text)}))}):Object(n.jsx)("input",{readOnly:!0,type:"text",className:"input "+(a||""),value:o||"",placeholder:l||"",onFocus:function(){return p(!0)}})})})},f=t(202),g=function(e){var a=e.className,t=e.placeholder,i=e.value,l=e.onChange,o=e.pdfMode,r=e.rows;return Object(n.jsx)(n.Fragment,{children:o?Object(n.jsx)(v.Text,{style:h("span "+(a||"")),children:i}):Object(n.jsx)(f.a,{minRows:r||1,className:"input "+(a||""),placeholder:t||"",value:i||"",onChange:l?function(e){return l(e.target.value)}:void 0})})},O=t(201),M=t.n(O),y=(t(470),function(e){var a=e.className,t=e.value,i=e.selected,l=e.onChange,o=e.pdfMode;return Object(n.jsx)(n.Fragment,{children:o?Object(n.jsx)(v.Text,{style:h("span "+(a||"")),children:t}):Object(n.jsx)(M.a,{className:"input "+(a||""),selected:i,onChange:l?function(e){return l(e)}:function(e){return null},dateFormat:"MMM dd, yyyy"})})}),N=[{value:"Bangladesh",text:"Bangladesh"},{value:"Belgium",text:"Belgium"},{value:"Burkina Faso",text:"Burkina Faso"},{value:"Bulgaria",text:"Bulgaria"},{value:"Bosnia and Herzegovina",text:"Bosnia and Herzegovina"},{value:"Barbados",text:"Barbados"},{value:"Wallis and Futuna",text:"Wallis and Futuna"},{value:"Saint Barthelemy",text:"Saint Barthelemy"},{value:"Bermuda",text:"Bermuda"},{value:"Brunei",text:"Brunei"},{value:"Bolivia",text:"Bolivia"},{value:"Bahrain",text:"Bahrain"},{value:"Burundi",text:"Burundi"},{value:"Benin",text:"Benin"},{value:"Bhutan",text:"Bhutan"},{value:"Jamaica",text:"Jamaica"},{value:"Bouvet Island",text:"Bouvet Island"},{value:"Botswana",text:"Botswana"},{value:"Samoa",text:"Samoa"},{value:"Bonaire, Saint Eustatius and Saba ",text:"Bonaire, Saint Eustatius and Saba "},{value:"Brazil",text:"Brazil"},{value:"Bahamas",text:"Bahamas"},{value:"Jersey",text:"Jersey"},{value:"Belarus",text:"Belarus"},{value:"Belize",text:"Belize"},{value:"Russia",text:"Russia"},{value:"Rwanda",text:"Rwanda"},{value:"Serbia",text:"Serbia"},{value:"East Timor",text:"East Timor"},{value:"Reunion",text:"Reunion"},{value:"Turkmenistan",text:"Turkmenistan"},{value:"Tajikistan",text:"Tajikistan"},{value:"Romania",text:"Romania"},{value:"Tokelau",text:"Tokelau"},{value:"Guinea-Bissau",text:"Guinea-Bissau"},{value:"Guam",text:"Guam"},{value:"Guatemala",text:"Guatemala"},{value:"South Georgia and the South Sandwich Islands",text:"South Georgia and the South Sandwich Islands"},{value:"Greece",text:"Greece"},{value:"Equatorial Guinea",text:"Equatorial Guinea"},{value:"Guadeloupe",text:"Guadeloupe"},{value:"Japan",text:"Japan"},{value:"Guyana",text:"Guyana"},{value:"Guernsey",text:"Guernsey"},{value:"French Guiana",text:"French Guiana"},{value:"Georgia",text:"Georgia"},{value:"Grenada",text:"Grenada"},{value:"United Kingdom",text:"United Kingdom"},{value:"Gabon",text:"Gabon"},{value:"El Salvador",text:"El Salvador"},{value:"Guinea",text:"Guinea"},{value:"Gambia",text:"Gambia"},{value:"Greenland",text:"Greenland"},{value:"Gibraltar",text:"Gibraltar"},{value:"Ghana",text:"Ghana"},{value:"Oman",text:"Oman"},{value:"Tunisia",text:"Tunisia"},{value:"Jordan",text:"Jordan"},{value:"Croatia",text:"Croatia"},{value:"Haiti",text:"Haiti"},{value:"Hungary",text:"Hungary"},{value:"Hong Kong",text:"Hong Kong"},{value:"Honduras",text:"Honduras"},{value:"Heard Island and McDonald Islands",text:"Heard Island and McDonald Islands"},{value:"Venezuela",text:"Venezuela"},{value:"Puerto Rico",text:"Puerto Rico"},{value:"Palestinian Territory",text:"Palestinian Territory"},{value:"Palau",text:"Palau"},{value:"Portugal",text:"Portugal"},{value:"Svalbard and Jan Mayen",text:"Svalbard and Jan Mayen"},{value:"Paraguay",text:"Paraguay"},{value:"Iraq",text:"Iraq"},{value:"Panama",text:"Panama"},{value:"French Polynesia",text:"French Polynesia"},{value:"Papua New Guinea",text:"Papua New Guinea"},{value:"Peru",text:"Peru"},{value:"Pakistan",text:"Pakistan"},{value:"Philippines",text:"Philippines"},{value:"Pitcairn",text:"Pitcairn"},{value:"Poland",text:"Poland"},{value:"Saint Pierre and Miquelon",text:"Saint Pierre and Miquelon"},{value:"Zambia",text:"Zambia"},{value:"Western Sahara",text:"Western Sahara"},{value:"Estonia",text:"Estonia"},{value:"Egypt",text:"Egypt"},{value:"South Africa",text:"South Africa"},{value:"Ecuador",text:"Ecuador"},{value:"Italy",text:"Italy"},{value:"Vietnam",text:"Vietnam"},{value:"Solomon Islands",text:"Solomon Islands"},{value:"Ethiopia",text:"Ethiopia"},{value:"Somalia",text:"Somalia"},{value:"Zimbabwe",text:"Zimbabwe"},{value:"Saudi Arabia",text:"Saudi Arabia"},{value:"Spain",text:"Spain"},{value:"Eritrea",text:"Eritrea"},{value:"Montenegro",text:"Montenegro"},{value:"Moldova",text:"Moldova"},{value:"Madagascar",text:"Madagascar"},{value:"Saint Martin",text:"Saint Martin"},{value:"Morocco",text:"Morocco"},{value:"Monaco",text:"Monaco"},{value:"Uzbekistan",text:"Uzbekistan"},{value:"Myanmar",text:"Myanmar"},{value:"Mali",text:"Mali"},{value:"Macao",text:"Macao"},{value:"Mongolia",text:"Mongolia"},{value:"Marshall Islands",text:"Marshall Islands"},{value:"Macedonia",text:"Macedonia"},{value:"Mauritius",text:"Mauritius"},{value:"Malta",text:"Malta"},{value:"Malawi",text:"Malawi"},{value:"Maldives",text:"Maldives"},{value:"Martinique",text:"Martinique"},{value:"Northern Mariana Islands",text:"Northern Mariana Islands"},{value:"Montserrat",text:"Montserrat"},{value:"Mauritania",text:"Mauritania"},{value:"Isle of Man",text:"Isle of Man"},{value:"Uganda",text:"Uganda"},{value:"Tanzania",text:"Tanzania"},{value:"Malaysia",text:"Malaysia"},{value:"Mexico",text:"Mexico"},{value:"Israel",text:"Israel"},{value:"France",text:"France"},{value:"British Indian Ocean Territory",text:"British Indian Ocean Territory"},{value:"Saint Helena",text:"Saint Helena"},{value:"Finland",text:"Finland"},{value:"Fiji",text:"Fiji"},{value:"Falkland Islands",text:"Falkland Islands"},{value:"Micronesia",text:"Micronesia"},{value:"Faroe Islands",text:"Faroe Islands"},{value:"Nicaragua",text:"Nicaragua"},{value:"Netherlands",text:"Netherlands"},{value:"Norway",text:"Norway"},{value:"Namibia",text:"Namibia"},{value:"Vanuatu",text:"Vanuatu"},{value:"New Caledonia",text:"New Caledonia"},{value:"Niger",text:"Niger"},{value:"Norfolk Island",text:"Norfolk Island"},{value:"Nigeria",text:"Nigeria"},{value:"New Zealand",text:"New Zealand"},{value:"Nepal",text:"Nepal"},{value:"Nauru",text:"Nauru"},{value:"Niue",text:"Niue"},{value:"Cook Islands",text:"Cook Islands"},{value:"Kosovo",text:"Kosovo"},{value:"Ivory Coast",text:"Ivory Coast"},{value:"Switzerland",text:"Switzerland"},{value:"Colombia",text:"Colombia"},{value:"China",text:"China"},{value:"Cameroon",text:"Cameroon"},{value:"Chile",text:"Chile"},{value:"Cocos Islands",text:"Cocos Islands"},{value:"Canada",text:"Canada"},{value:"Republic of the Congo",text:"Republic of the Congo"},{value:"Central African Republic",text:"Central African Republic"},{value:"Democratic Republic of the Congo",text:"Democratic Republic of the Congo"},{value:"Czech Republic",text:"Czech Republic"},{value:"Cyprus",text:"Cyprus"},{value:"Christmas Island",text:"Christmas Island"},{value:"Costa Rica",text:"Costa Rica"},{value:"Curacao",text:"Curacao"},{value:"Cape Verde",text:"Cape Verde"},{value:"Cuba",text:"Cuba"},{value:"Swaziland",text:"Swaziland"},{value:"Syria",text:"Syria"},{value:"Sint Maarten",text:"Sint Maarten"},{value:"Kyrgyzstan",text:"Kyrgyzstan"},{value:"Kenya",text:"Kenya"},{value:"South Sudan",text:"South Sudan"},{value:"Suriname",text:"Suriname"},{value:"Kiribati",text:"Kiribati"},{value:"Cambodia",text:"Cambodia"},{value:"Saint Kitts and Nevis",text:"Saint Kitts and Nevis"},{value:"Comoros",text:"Comoros"},{value:"Sao Tome and Principe",text:"Sao Tome and Principe"},{value:"Slovakia",text:"Slovakia"},{value:"South Korea",text:"South Korea"},{value:"Slovenia",text:"Slovenia"},{value:"North Korea",text:"North Korea"},{value:"Kuwait",text:"Kuwait"},{value:"Senegal",text:"Senegal"},{value:"San Marino",text:"San Marino"},{value:"Sierra Leone",text:"Sierra Leone"},{value:"Seychelles",text:"Seychelles"},{value:"Kazakhstan",text:"Kazakhstan"},{value:"Cayman Islands",text:"Cayman Islands"},{value:"Singapore",text:"Singapore"},{value:"Sweden",text:"Sweden"},{value:"Sudan",text:"Sudan"},{value:"Dominican Republic",text:"Dominican Republic"},{value:"Dominica",text:"Dominica"},{value:"Djibouti",text:"Djibouti"},{value:"Denmark",text:"Denmark"},{value:"British Virgin Islands",text:"British Virgin Islands"},{value:"Germany",text:"Germany"},{value:"Yemen",text:"Yemen"},{value:"Algeria",text:"Algeria"},{value:"United States",text:"United States"},{value:"Uruguay",text:"Uruguay"},{value:"Mayotte",text:"Mayotte"},{value:"United States Minor Outlying Islands",text:"United States Minor Outlying Islands"},{value:"Lebanon",text:"Lebanon"},{value:"Saint Lucia",text:"Saint Lucia"},{value:"Laos",text:"Laos"},{value:"Tuvalu",text:"Tuvalu"},{value:"Taiwan",text:"Taiwan"},{value:"Trinidad and Tobago",text:"Trinidad and Tobago"},{value:"Turkey",text:"Turkey"},{value:"Sri Lanka",text:"Sri Lanka"},{value:"Liechtenstein",text:"Liechtenstein"},{value:"Latvia",text:"Latvia"},{value:"Tonga",text:"Tonga"},{value:"Lithuania",text:"Lithuania"},{value:"Luxembourg",text:"Luxembourg"},{value:"Liberia",text:"Liberia"},{value:"Lesotho",text:"Lesotho"},{value:"Thailand",text:"Thailand"},{value:"French Southern Territories",text:"French Southern Territories"},{value:"Togo",text:"Togo"},{value:"Chad",text:"Chad"},{value:"Turks and Caicos Islands",text:"Turks and Caicos Islands"},{value:"Libya",text:"Libya"},{value:"Vatican",text:"Vatican"},{value:"Saint Vincent and the Grenadines",text:"Saint Vincent and the Grenadines"},{value:"United Arab Emirates",text:"United Arab Emirates"},{value:"Andorra",text:"Andorra"},{value:"Antigua and Barbuda",text:"Antigua and Barbuda"},{value:"Afghanistan",text:"Afghanistan"},{value:"Anguilla",text:"Anguilla"},{value:"U.S. Virgin Islands",text:"U.S. Virgin Islands"},{value:"Iceland",text:"Iceland"},{value:"Iran",text:"Iran"},{value:"Armenia",text:"Armenia"},{value:"Albania",text:"Albania"},{value:"Angola",text:"Angola"},{value:"Antarctica",text:"Antarctica"},{value:"American Samoa",text:"American Samoa"},{value:"Argentina",text:"Argentina"},{value:"Australia",text:"Australia"},{value:"Austria",text:"Austria"},{value:"Aruba",text:"Aruba"},{value:"India",text:"India"},{value:"Aland Islands",text:"Aland Islands"},{value:"Azerbaijan",text:"Azerbaijan"},{value:"Ireland",text:"Ireland"},{value:"Indonesia",text:"Indonesia"},{value:"Ukraine",text:"Ukraine"},{value:"Qatar",text:"Qatar"},{value:"Mozambique",text:"Mozambique"}],w=function(e){var a=e.pdfMode,t=e.children;return Object(n.jsx)(n.Fragment,{children:a?Object(n.jsx)(v.Document,{children:t}):Object(n.jsx)(n.Fragment,{children:t})})},S=function(e){var a=e.className,t=e.pdfMode,i=e.children;return Object(n.jsx)(n.Fragment,{children:t?Object(n.jsx)(v.Page,{size:"A4",style:h("page "+(a||"")),children:i}):Object(n.jsx)("div",{className:"page "+(a||""),children:i})})},C=function(e){var a=e.className,t=e.pdfMode,i=e.children;return Object(n.jsx)(n.Fragment,{children:t?Object(n.jsx)(v.View,{style:h("view "+(a||"")),children:i}):Object(n.jsx)("div",{className:"view "+(a||""),children:i})})},L=function(e){var a=e.className,t=e.pdfMode,i=e.children;return Object(n.jsx)(n.Fragment,{children:t?Object(n.jsx)(v.Text,{style:h("span "+(a||"")),children:i}):Object(n.jsx)("span",{className:"span "+(a||""),children:i})})},I=function(e){var a=e.data,t=Object(i.useState)(!1),l=Object(c.a)(t,2),o=l[0],r=l[1];Object(i.useEffect)((function(){r(!1);var e=setTimeout((function(){r(!0)}),500);return function(){return clearTimeout(e)}}),[a]);return Object(n.jsx)("div",{className:"download-pdf "+(o?"":"loading"),title:"Save PDF",children:o&&Object(n.jsx)(v.PDFDownloadLink,{document:Object(n.jsx)(T,{pdfMode:!0,data:a}),fileName:"".concat((a.invoiceTitle||"invoice").toLowerCase(),".pdf"),"aria-label":"Save PDF"})})},A=t(47);v.Font.register({family:"Nunito",fonts:[{src:"https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf"},{src:"https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf",fontWeight:600}]});var T=function(e){var a=e.data,t=e.pdfMode,l=Object(i.useState)(a?Object(s.a)({},a):Object(s.a)({},x)),o=Object(c.a)(l,2),r=o[0],v=o[1],p=Object(i.useState)(),b=Object(c.a)(p,2),h=b[0],f=b[1],O=Object(i.useState)(),M=Object(c.a)(O,2),T=M[0],k=M[1],B="MMM dd, yyyy",D=""!==r.invoiceDate?new Date(r.invoiceDate):new Date,F=""!==r.invoiceDueDate?new Date(r.invoiceDueDate):new Date(D.valueOf());""===r.invoiceDueDate&&F.setDate(F.getDate()+30);var G=function(e,a){if("productLines"!==e){var t=Object(s.a)({},r);t[e]=a,v(t)}},R=function(e,a,t){var n=r.productLines.map((function(n,i){if(i===e){var l=Object(s.a)({},n);if("description"===a)l[a]=t;else if("."===t[t.length-1]||"0"===t[t.length-1]&&t.includes("."))l[a]=t;else{var o=parseFloat(t);l[a]=(o||0).toString()}return l}return Object(s.a)({},n)}));v(Object(s.a)(Object(s.a)({},r),{},{productLines:n}))},P=function(e,a){var t=parseFloat(e),n=parseFloat(a);return(t&&n?t*n:0).toFixed(2)};return Object(i.useEffect)((function(){var e=0;r.productLines.forEach((function(a){var t=parseFloat(a.quantity),n=parseFloat(a.rate);e+=t&&n?t*n:0})),f(e)}),[r.productLines]),Object(i.useEffect)((function(){var e=r.taxLabel.match(/(\d+)%/),a=e?parseFloat(e[1]):0;k(h?h*a/100:0)}),[h,r.taxLabel]),Object(n.jsx)(w,{pdfMode:t,children:Object(n.jsxs)(S,{className:"invoice-wrapper",pdfMode:t,children:[!t&&Object(n.jsx)(I,{data:r}),Object(n.jsxs)(C,{className:"flex",pdfMode:t,children:[Object(n.jsxs)(C,{className:"w-50",pdfMode:t,children:[Object(n.jsx)(j,{className:"fs-20 bold",placeholder:"Your Company",value:r.companyName,onChange:function(e){return G("companyName",e)},pdfMode:t}),Object(n.jsx)(j,{placeholder:"Your Name",value:r.name,onChange:function(e){return G("name",e)},pdfMode:t}),Object(n.jsx)(j,{placeholder:"Company's Address",value:r.companyAddress,onChange:function(e){return G("companyAddress",e)},pdfMode:t}),Object(n.jsx)(j,{placeholder:"City, State Zip",value:r.companyAddress2,onChange:function(e){return G("companyAddress2",e)},pdfMode:t}),Object(n.jsx)(m,{options:N,value:r.companyCountry,onChange:function(e){return G("companyCountry",e)},pdfMode:t})]}),Object(n.jsx)(C,{className:"w-50",pdfMode:t,children:Object(n.jsx)(j,{className:"fs-45 right bold",placeholder:"Invoice",value:r.title,onChange:function(e){return G("title",e)},pdfMode:t})})]}),Object(n.jsxs)(C,{className:"flex mt-40",pdfMode:t,children:[Object(n.jsxs)(C,{className:"w-55",pdfMode:t,children:[Object(n.jsx)(j,{className:"bold dark mb-5",value:r.billTo,onChange:function(e){return G("billTo",e)},pdfMode:t}),Object(n.jsx)(j,{placeholder:"Your Client's Name",value:r.clientName,onChange:function(e){return G("clientName",e)},pdfMode:t}),Object(n.jsx)(j,{placeholder:"Client's Address",value:r.clientAddress,onChange:function(e){return G("clientAddress",e)},pdfMode:t}),Object(n.jsx)(j,{placeholder:"City, State Zip",value:r.clientAddress2,onChange:function(e){return G("clientAddress2",e)},pdfMode:t}),Object(n.jsx)(m,{options:N,value:r.clientCountry,onChange:function(e){return G("clientCountry",e)},pdfMode:t})]}),Object(n.jsxs)(C,{className:"w-45",pdfMode:t,children:[Object(n.jsxs)(C,{className:"flex mb-5",pdfMode:t,children:[Object(n.jsx)(C,{className:"w-40",pdfMode:t,children:Object(n.jsx)(j,{className:"bold",value:r.invoiceTitleLabel,onChange:function(e){return G("invoiceTitleLabel",e)},pdfMode:t})}),Object(n.jsx)(C,{className:"w-60",pdfMode:t,children:Object(n.jsx)(j,{placeholder:"INV-12",value:r.invoiceTitle,onChange:function(e){return G("invoiceTitle",e)},pdfMode:t})})]}),Object(n.jsxs)(C,{className:"flex mb-5",pdfMode:t,children:[Object(n.jsx)(C,{className:"w-40",pdfMode:t,children:Object(n.jsx)(j,{className:"bold",value:r.invoiceDateLabel,onChange:function(e){return G("invoiceDateLabel",e)},pdfMode:t})}),Object(n.jsx)(C,{className:"w-60",pdfMode:t,children:Object(n.jsx)(y,{value:Object(A.default)(D,B),selected:D,onChange:function(e){return G("invoiceDate",e&&!Array.isArray(e)?Object(A.default)(e,B):"")},pdfMode:t})})]}),Object(n.jsxs)(C,{className:"flex mb-5",pdfMode:t,children:[Object(n.jsx)(C,{className:"w-40",pdfMode:t,children:Object(n.jsx)(j,{className:"bold",value:r.invoiceDueDateLabel,onChange:function(e){return G("invoiceDueDateLabel",e)},pdfMode:t})}),Object(n.jsx)(C,{className:"w-60",pdfMode:t,children:Object(n.jsx)(y,{value:Object(A.default)(F,B),selected:F,onChange:function(e){return G("invoiceDueDate",e&&!Array.isArray(e)?Object(A.default)(e,B):"")},pdfMode:t})})]})]})]}),Object(n.jsxs)(C,{className:"mt-30 bg-dark flex",pdfMode:t,children:[Object(n.jsx)(C,{className:"w-48 p-4-8",pdfMode:t,children:Object(n.jsx)(j,{className:"white bold",value:r.productLineDescription,onChange:function(e){return G("productLineDescription",e)},pdfMode:t})}),Object(n.jsx)(C,{className:"w-17 p-4-8",pdfMode:t,children:Object(n.jsx)(j,{className:"white bold right",value:r.productLineQuantity,onChange:function(e){return G("productLineQuantity",e)},pdfMode:t})}),Object(n.jsx)(C,{className:"w-17 p-4-8",pdfMode:t,children:Object(n.jsx)(j,{className:"white bold right",value:r.productLineQuantityRate,onChange:function(e){return G("productLineQuantityRate",e)},pdfMode:t})}),Object(n.jsx)(C,{className:"w-18 p-4-8",pdfMode:t,children:Object(n.jsx)(j,{className:"white bold right",value:r.productLineQuantityAmount,onChange:function(e){return G("productLineQuantityAmount",e)},pdfMode:t})})]}),r.productLines.map((function(e,a){return t&&""===e.description?Object(n.jsx)(L,{},a):Object(n.jsxs)(C,{className:"row flex",pdfMode:t,children:[Object(n.jsx)(C,{className:"w-48 p-4-8 pb-10",pdfMode:t,children:Object(n.jsx)(g,{className:"dark",rows:2,placeholder:"Enter item name/description",value:e.description,onChange:function(e){return R(a,"description",e)},pdfMode:t})}),Object(n.jsx)(C,{className:"w-17 p-4-8 pb-10",pdfMode:t,children:Object(n.jsx)(j,{className:"dark right",value:e.quantity,onChange:function(e){return R(a,"quantity",e)},pdfMode:t})}),Object(n.jsx)(C,{className:"w-17 p-4-8 pb-10",pdfMode:t,children:Object(n.jsx)(j,{className:"dark right",value:e.rate,onChange:function(e){return R(a,"rate",e)},pdfMode:t})}),Object(n.jsx)(C,{className:"w-18 p-4-8 pb-10",pdfMode:t,children:Object(n.jsx)(L,{className:"dark right",pdfMode:t,children:P(e.quantity,e.rate)})}),!t&&Object(n.jsx)("button",{className:"link row__remove","aria-label":"Remove Row",title:"Remove Row",onClick:function(){return function(e){var a=r.productLines.filter((function(a,t){return t!==e}));v(Object(s.a)(Object(s.a)({},r),{},{productLines:a}))}(a)},children:Object(n.jsx)("span",{className:"icon icon-remove bg-red"})})]},a)})),Object(n.jsxs)(C,{className:"flex",pdfMode:t,children:[Object(n.jsx)(C,{className:"w-50 mt-10",pdfMode:t,children:!t&&Object(n.jsxs)("button",{className:"link",onClick:function(){var e=[].concat(Object(u.a)(r.productLines),[Object(s.a)({},d)]);v(Object(s.a)(Object(s.a)({},r),{},{productLines:e}))},children:[Object(n.jsx)("span",{className:"icon icon-add bg-green mr-10"}),"Add Line Item"]})}),Object(n.jsxs)(C,{className:"w-50 mt-20",pdfMode:t,children:[Object(n.jsxs)(C,{className:"flex",pdfMode:t,children:[Object(n.jsx)(C,{className:"w-50 p-5",pdfMode:t,children:Object(n.jsx)(j,{value:r.subTotalLabel,onChange:function(e){return G("subTotalLabel",e)},pdfMode:t})}),Object(n.jsx)(C,{className:"w-50 p-5",pdfMode:t,children:Object(n.jsx)(L,{className:"right bold dark",pdfMode:t,children:null===h||void 0===h?void 0:h.toFixed(2)})})]}),Object(n.jsxs)(C,{className:"flex",pdfMode:t,children:[Object(n.jsx)(C,{className:"w-50 p-5",pdfMode:t,children:Object(n.jsx)(j,{value:r.taxLabel,onChange:function(e){return G("taxLabel",e)},pdfMode:t})}),Object(n.jsx)(C,{className:"w-50 p-5",pdfMode:t,children:Object(n.jsx)(L,{className:"right bold dark",pdfMode:t,children:null===T||void 0===T?void 0:T.toFixed(2)})})]}),Object(n.jsxs)(C,{className:"flex bg-gray p-5",pdfMode:t,children:[Object(n.jsx)(C,{className:"w-50 p-5",pdfMode:t,children:Object(n.jsx)(j,{className:"bold",value:r.totalLabel,onChange:function(e){return G("totalLabel",e)},pdfMode:t})}),Object(n.jsxs)(C,{className:"w-50 p-5 flex",pdfMode:t,children:[Object(n.jsx)(j,{className:"dark bold right ml-30",value:r.currency,onChange:function(e){return G("currency",e)},pdfMode:t}),Object(n.jsx)(L,{className:"right bold dark w-auto",pdfMode:t,children:("undefined"!==typeof h&&"undefined"!==typeof T?h+T:0).toFixed(2)})]})]})]})]}),Object(n.jsxs)(C,{className:"mt-20",pdfMode:t,children:[Object(n.jsx)(j,{className:"bold w-100",value:r.notesLabel,onChange:function(e){return G("notesLabel",e)},pdfMode:t}),Object(n.jsx)(g,{className:"w-100",rows:2,value:r.notes,onChange:function(e){return G("notes",e)},pdfMode:t})]}),Object(n.jsxs)(C,{className:"mt-20",pdfMode:t,children:[Object(n.jsx)(j,{className:"bold w-100",value:r.termLabel,onChange:function(e){return G("termLabel",e)},pdfMode:t}),Object(n.jsx)(g,{className:"w-100",rows:2,value:r.term,onChange:function(e){return G("term",e)},pdfMode:t})]})]})})};var k=function(){return Object(n.jsxs)("div",{className:"app",children:[Object(n.jsx)("h1",{className:"center primary fs-30",children:"React Invoice Generator"}),Object(n.jsx)(T,{})]})},B=(t(518),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function D(e,a){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(Object(n.jsx)(l.a.StrictMode,{children:Object(n.jsx)(k,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/invoice.app",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var a="".concat("/invoice.app","/service-worker.js");B?(!function(e,a){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var n=t.headers.get("content-type");404===t.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):D(e,a)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(a,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):D(a,e)}))}}()}},[[519,1,2]]]);
//# sourceMappingURL=main.5acfd59c.chunk.js.map