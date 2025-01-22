import { CSSProperties } from "react";

export interface Props {
  height?: number | string;
  width?: number | string;
  customStyle?: CSSProperties;
}

const VitestIcon = (props: Props) => {
  return (
    <svg
      height={props.height}
      preserveAspectRatio="xMidYMid"
      style={props.customStyle}
      version="1.1"
      viewBox="0 0 256 234"
      width={props.width}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>vitest</title>
      <g>
        <path
          d="M192.115018,70.8083821 L130.914358,159.296327 C130.265568,160.234541 129.327185,160.937354 128.241634,161.298075 C127.156084,161.658796 125.982639,161.655409 124.899291,161.292995 C123.815942,160.928886 122.881962,160.222686 122.23876,159.282779 C121.595728,158.341178 121.278531,157.216676 121.335772,156.08032 L123.78512,107.225806 L84.2429694,98.839802 C83.3978997,98.6607962 82.6105792,98.2768738 81.950612,97.7222438 C81.2906447,97.1677833 80.7783529,96.4595505 80.4592925,95.6603753 C80.1402321,94.8612002 80.0242256,93.9958081 80.121434,93.1407466 C80.2186424,92.2858544 80.5260175,91.4675424 81.0164627,90.7584629 L142.217801,2.27034881 C142.86676,1.33162707 143.805143,0.628982928 144.890693,0.268769843 C145.976413,-0.0914432423 147.149858,-0.0895803631 148.233376,0.27435848 C149.316725,0.638127971 150.250874,1.34398981 150.893906,2.28491313 C151.536938,3.2256671 151.853966,4.34999934 151.796556,5.48737173 L149.347208,54.3423934 L188.88885,62.7277204 C189.73392,62.9067262 190.52141,63.2906486 191.181885,63.8451092 C191.842361,64.3997391 192.353806,65.1079719 192.672189,65.9071471 C192.992265,66.7063222 193.107425,67.5717143 193.010894,68.4266064 C192.914363,69.281668 192.606141,70.09998 192.115018,70.8090595 L192.115018,70.8083821 Z"
          fill="#FCC72B"
        ></path>
        <path
          d="M128.024524,233.537148 C126.396707,233.538835 124.784639,233.220452 123.280787,232.597234 C121.776936,231.974016 120.410937,231.059512 119.261541,229.907914 L61.4337079,172.084145 C59.1203507,169.758934 57.8236174,166.610668 57.8278409,163.330307 C57.8322544,160.049946 59.1372859,156.903374 61.4570785,154.584936 C63.7767018,152.264805 66.9217498,150.959096 70.20228,150.954015 C73.4829795,150.950628 76.631584,152.246176 78.9576426,154.559533 L128.024524,203.620996 L234.917207,96.7333937 C237.247499,94.4406975 240.388991,93.1617463 243.657497,93.1750213 C246.927697,93.1883347 250.059027,94.4928582 252.368997,96.8043525 C254.680661,99.1160161 255.98637,102.247177 256,105.516191 C256.011773,108.785206 254.73316,111.927036 252.440126,114.257159 L136.785306,229.907914 C135.636079,231.061206 134.270419,231.974016 132.766907,232.597234 C131.263563,233.220452 129.651834,233.538835 128.024524,233.537148 Z"
          fill="#729B1B"
        ></path>
        <path
          d="M127.974735,233.537148 C129.602552,233.538835 131.21462,233.220452 132.718472,232.597234 C134.222323,231.974016 135.588152,231.059512 136.737718,229.907914 L194.565551,172.084145 C196.878908,169.758934 198.17615,166.610668 198.171084,163.330307 C198.167682,160.049946 196.861973,156.903374 194.541842,154.584936 C192.221711,152.264805 189.076832,150.959096 185.796471,150.954015 C182.51611,150.950628 179.367844,152.246176 177.040939,154.559533 L127.974735,203.620996 L21.0822215,96.7333937 C18.751929,94.4406975 15.6100986,93.1617463 12.3412538,93.1750213 C9.07223962,93.1883347 5.94090913,94.4928582 3.62943176,96.8043525 C1.31790358,99.1160161 0.013413991,102.247177 -1.20332295e-14,105.516191 C-0.0132082455,108.785206 1.26574296,111.927036 3.55837139,114.257159 L119.213783,229.907914 C120.36318,231.061206 121.72884,231.974016 123.232183,232.597234 C124.735696,233.220452 126.347425,233.538835 127.974735,233.537148 Z"
          fill="#729B1B"
          fillOpacity="0.5"
        ></path>
      </g>
    </svg>
  );
};

export default VitestIcon;
