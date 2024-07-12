import React from 'react';

interface EmptyStateIconProps {
    width?: number;
    height?: number;
}

const EmptyStateIcon = ({ width = 150, height = 150 }: EmptyStateIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={width} height={height} viewBox="0 0 200 200">
            <g fill="#000">
                <path d="M133.635 177.032c-.694-1.293-1.233-2.661-1.929-3.955-.372-.692-.904.117-4.914 1.782-.313.13-.452.416-.299.734l1.913 3.984c.127.264.453.278.684.179 1.477-.63 2.923-1.337 4.366-2.041.249-.121.299-.459.179-.683ZM125.237 181.014a172.787 172.787 0 0 1-5.784-11.235.5.5 0 0 1 .905-.425 171.537 171.537 0 0 0 5.75 11.17c.324.576-.549 1.061-.871.49ZM122.823 182.43a.5.5 0 0 1-.437-.256 62.783 62.783 0 0 1-3.654-7.743.501.501 0 0 1 .932-.364 61.636 61.636 0 0 0 3.595 7.619.5.5 0 0 1-.436.744Z" />
                <path d="M137.337 176.4c-1.306-3.422-6.758-16.069-11.833-27.011-.292.174-.583.347-.876.519 5.074 10.945 10.53 23.581 11.781 26.864.004.012.009.022.014.033.869 1.867.284 3.444-1.735 4.587-3.808 2.737-15.925 7.962-19.995 9.694-4.751-10.228-9.23-20.485-13.867-30.541a117.774 117.774 0 0 1-5.299 1.563c4.653 10.19 9.11 20.584 14.012 31.125-1.492.607-2.327.931-2.359.946a3.475 3.475 0 0 1-4.578-1.723c-3.505-5.298-10.553-20.311-15.354-31.351a5.692 5.692 0 0 1-1.29-.473c4.822 11.151 12.181 26.888 15.773 32.311 1.022 2.198 3.651 3.175 5.84 2.155 4.503-1.707 23.35-9.673 27.65-12.863 2.426-1.37 3.196-3.495 2.116-5.835ZM112.863 84.205c2.318-2.74 4.306-6.406 6.442-9.549-8.308-.008-17.196-6.507-20.166-14.926-3.01-8.53-2.734-18.63-2.157-26.475.286-3.883.725-8.354 2.336-12.279 3.896-9.49 12.118-12.56 20.424-14.463 9.845-2.255 19.851-2.623 29.741-1.094 4.946.764 11.291 2.196 16.49 6.516 9.792 8.135 11.736 26.27 9.399 39.674-1.291 7.4-5.363 14.094-10.895 17.908-2.517 1.735-5.417 3.017-9.402 4.155-8.988 2.57-18.567 3.04-27.705 1.362-1.573-.29-1.866-.208-3.031.777l-10.772 9.097c-.461.39-1.099-.238-.704-.705v.002Zm7.826-9.79c-1.534 2.154-3.006 4.696-4.535 7.001 8.538-7.21 8.294-7.118 9.138-7.392.762-.248 1.54-.104 2.226.022 9.019 1.655 18.442 1.192 27.282-1.334 3.876-1.108 6.686-2.346 9.109-4.017 5.315-3.665 9.232-10.116 10.477-17.257 2.29-13.13.433-30.852-9.053-38.733-5.011-4.163-11.185-5.552-16.004-6.297-9.765-1.509-19.645-1.146-29.365 1.081-8.043 1.843-15.999 4.798-19.722 13.868-1.555 3.788-1.984 8.166-2.264 11.972-.57 7.748-.846 17.713 2.103 26.07 2.952 8.366 11.995 14.75 20.169 14.228a.5.5 0 0 1 .439.788Z" />
                <path d="M140.772 14.363c-16.844 0-24.666 11.106-24.666 25.139 0 13.65 7.507 25.14 24.666 25.14 10.727 0 19.453-11.277 19.453-25.14 0-13.863-8.727-25.139-19.453-25.139Zm0 49.279c-10.176 0-18.454-10.829-18.454-24.14s8.278-24.139 18.454-24.139 18.453 10.829 18.453 24.139c0 13.31-8.278 24.14-18.453 24.14Z" />
                <path d="M141.246 24.03c-5.031 0-9.124 6.6-9.124 14.714s4.093 14.715 9.124 14.715c5.031 0 9.124-6.6 9.124-14.715s-4.093-14.715-9.124-14.715Zm-8.124 14.714c0-6.024 2.312-11.153 5.517-12.99 3.206 1.836 5.518 6.965 5.518 12.99s-2.312 11.153-5.518 12.991c-3.205-1.838-5.517-6.967-5.517-12.99ZM126.292 136.664c-2.757-8.038-5.915-16.159-11.274-22.754-1.445-1.779-2.558-2.234-5.304-1.228-4.836 1.771-9.539 3.943-14.213 6.104-3.748 1.732-7.623 3.523-10.952 6.148-1.491 1.176-2.234 2.366-1.232 5.17 2.009 5.625 7.328 19.368 10.221 23.273.512.69.742.805 1.446.708 3.886-.537 7.566-1.548 10.972-2.978a139.82 139.82 0 0 0 12.248-5.859c2.492-1.345 5.329-2.976 7.452-5.311 1.085-1.191 1.103-1.918.638-3.275l-.002.002Zm-39.579-.33a150.73 150.73 0 0 0 7.852-3.007 355.098 355.098 0 0 1 3.602 8.78 381.09 381.09 0 0 1-7.734 3.127 197.732 197.732 0 0 1-3.72-8.899v-.001Zm8.773-3.395a150.682 150.682 0 0 0 7.697-3.514 303.868 303.868 0 0 1 3.869 8.745 211.133 211.133 0 0 1-7.964 3.548 356.633 356.633 0 0 0-3.602-8.779Zm8.594-3.957a151.21 151.21 0 0 0 7.453-3.984c.176.388 2.792 6.292 3.892 8.875a128.269 128.269 0 0 1-7.468 3.868 302.052 302.052 0 0 0-3.876-8.758l-.001-.001Zm1.811-13.731c2.142 2.598 3.705 5.561 5.223 8.834a150.068 150.068 0 0 1-7.455 3.989 296.951 296.951 0 0 0-4.759-9.753c2.3-1.053 4.634-2.097 6.991-3.07Zm6.513 9.246a151.364 151.364 0 0 0 6.064-3.71c1.582 2.784 2.914 5.696 4.081 8.589-1.925 1.381-4.026 2.713-6.25 3.998a441.174 441.174 0 0 0-3.896-8.876l.001-.001Zm1.839-9.956a44.61 44.61 0 0 1 3.723 5.38 150.363 150.363 0 0 1-5.981 3.664c-1.49-3.208-3.031-6.127-5.125-8.729 5.09-2.055 5.73-2.348 7.384-.314l-.001-.001Zm-16.251 4.197a296.578 296.578 0 0 1 4.772 9.78 150.543 150.543 0 0 1-7.671 3.503 205.383 205.383 0 0 0-4.497-9.749c2.147-1.135 4.515-2.205 7.396-3.534Zm-13.888 8.108c.608-1.187 4.43-3.443 5.613-4.098a204.179 204.179 0 0 1 4.454 9.659 149.12 149.12 0 0 1-7.819 2.994 237.49 237.49 0 0 1-2.094-5.633c-.463-1.297-.512-2.226-.154-2.922Zm10.915 26.226c-.467.062-.353.15-.678-.29-.751-1.014-1.997-3.374-3.494-6.638a379.973 379.973 0 0 0 7.688-3.108c1.123 2.849 2.218 5.692 3.301 8.508a41.47 41.47 0 0 1-6.817 1.528Zm7.77-1.838a1075.706 1075.706 0 0 0-3.332-8.586 212.047 212.047 0 0 0 7.985-3.556 299.192 299.192 0 0 1 3.494 8.705c-2.37 1.116-5.666 2.599-8.147 3.438v-.001Zm9.053-3.868a299.19 299.19 0 0 0-3.496-8.704 129.697 129.697 0 0 0 7.472-3.864c1.22 2.879 2.41 5.771 3.564 8.656-1.627.931-4.535 2.472-7.54 3.912Zm13.074-8.1c-1.349 1.483-2.976 2.654-4.662 3.675a459.922 459.922 0 0 0-3.561-8.641c2.214-1.274 4.31-2.596 6.237-3.967.887 2.262 1.678 4.504 2.417 6.655.363 1.06.372 1.396-.431 2.278ZM88.011 97.246c-2.014.774-1.955 3.896-1.16 5.962.811 2.11 2.898 4.405 4.855 3.65 2.016-.774 1.955-3.898 1.16-5.963-.788-2.05-2.833-4.428-4.855-3.65Z" />
                <path d="M108.379 100.438c-1.291-4.138-3.095-7.705-5.488-11.364-1.672-2.556-3.589-3.654-5.697-3.266-8.208 1.514-26.358 8.751-27.466 12.792-.18.393-.193.808-.199.983-.072 2.165.62 4.195 1.29 6.159 1.179 3.457 2.407 6.616 4.316 9.73 1.779 2.903 3.933 3.83 6.112 3.642 3.58-.312 6.93-1.526 10.625-2.962 3.179-1.235 6.275-2.473 9.191-4.058 1.542-.838 3.087-1.668 4.5-2.732 4.169-3.137 4.328-4.078 2.816-8.925v.001Zm-15.622 9.611c-3.553 1.367-7.359-1.635-8.822-5.439-1.631-4.242-.327-8.705 2.907-9.948 3.233-1.242 7.19 1.196 8.821 5.439 1.631 4.242.327 8.705-2.906 9.948Z" />
                <path d="M131.41 139.996c-6.896-17.964-15.607-38.841-27.933-57.479-.339-.513-.803-1.215-1.56-1.538-.135-.058-4.585-1.361-7.438-1.594a20.787 20.787 0 0 0-3.538.021C85.413 68.238 74.762 62.562 67.097 56.19c-6.578-5.469-10.331-11.182-11.153-16.98a.5.5 0 0 0-.692-.389C28.28 50.355 27.399 50.898 24.106 51.712a.5.5 0 0 0-.363.613c2.854 10.793 11.29 20.664 22.563 26.405 5.443 2.772 13.212 5.298 16.719 11.087a49.287 49.287 0 0 0-2.668 1.655c-4.465 2.977-4.869 5.2-4.578 8.319 1.381 14.954 11.011 36.102 18.569 49.199 1.219 2.113 2.554 4.343 4.277 6.329 3.208 3.698 7.571 6.253 12.317 7.287 2.116.461 4.535.047 6.078-.389a118.776 118.776 0 0 0 32.264-14.588c3.017-1.95 3.698-3.54 2.127-7.632l-.001-.001ZM46.759 77.839c-10.854-5.527-19.013-14.951-21.918-25.284 3.156-.848 3.645-1.173 30.215-12.562 1.034 5.83 4.867 11.535 11.401 16.967 7.572 6.294 18.65 12.199 23.94 23.624-7.792 2.177-17.554 5.361-25.496 10.783-3.022-7.608-11.842-10.319-18.143-13.527l.001-.001Zm81.98 68.949a117.746 117.746 0 0 1-33.841 14.972c-1.321.35-1.852.332-2.917-1.425-10.915-18.013-24.851-50.46-26.609-60.847-.415-2.446-.356-2.805 1.72-4.561 1.193-1.01 2.553-1.819 3.805-2.529a91.767 91.767 0 0 1 29.032-10.5c1.496-.27 1.867-.11 2.714 1.172 12.272 18.558 20.957 39.372 27.833 57.285 1.411 3.677.839 4.769-1.737 6.434v-.001Z" />
                <path d="M35.951 61.145c5.366-1.427 10.603-4.179 17.411-7.506a.498.498 0 1 1 .438.898c-7.221 3.516-12.236 6.15-17.592 7.574-.649.173-.888-.799-.257-.966ZM39.437 66.305a280.439 280.439 0 0 0 20.177-8.731.5.5 0 0 1 .433.9 281.35 281.35 0 0 1-20.249 8.763c-.624.24-.97-.696-.361-.932ZM45.777 71.7c-.568 0-.693-.804-.152-.978a103.774 103.774 0 0 0 19.247-8.396.5.5 0 1 1 .491.871C56.015 68.463 46.248 71.7 45.777 71.7ZM52.908 75.223a99.48 99.48 0 0 0 16.026-6.815.5.5 0 0 1 .471.883 100.491 100.491 0 0 1-16.188 6.884c-.639.207-.93-.75-.309-.952ZM61.437 80.556c-.525 0-.694-.71-.225-.947a201.748 201.748 0 0 1 18.058-7.994.5.5 0 0 1 .359.933c-12.326 4.746-17.646 8.008-18.192 8.008ZM66.271 85.128c-.556 0-.694-.778-.172-.969a260.333 260.333 0 0 0 12.557-4.989.5.5 0 1 1 .393.92c-2.348 1.003-12.204 5.038-12.778 5.038Z" />
            </g>
        </svg>
    );
};

export default EmptyStateIcon;
