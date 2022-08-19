import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={36} height={36} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M9.823 30c-1.542.016-3.025-.521-4.116-1.489-1.09-.968-1.695-2.285-1.677-3.654V11.143C4.03 9.057 5.28 6 9.823 6h17.38v17.143H9.823c-1.973 0-4.506 1.086-3.862 3.428.206.75 1.732 1.715 3.862 1.715h19.31V9.429h1.932V30H9.823Zm0-5.143h17.38v1.714H9.823v-1.714Z"
      fill="#FFF"
      fillRule="nonzero"
    />
  </svg>
);

export default SvgComponent;
