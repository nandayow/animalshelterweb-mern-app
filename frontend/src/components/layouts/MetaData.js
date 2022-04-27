// import React from "react";
// import { Helmet } from "react-helmet";

// function MetaData({ children, title }) {
//   return (
//     <Helmet>
//       <div className="page">
//         {title && (
//           <>
//             <h1 className="heading">{title}</h1>
//             <hr />
//           </>
//         )}
//         {children}
//       </div>
//     </Helmet>
//   );
// }

// export default MetaData;
import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - AnimalShelter`}</title>
    </Helmet>
  );
};

export default MetaData;
