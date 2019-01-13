import React, {Suspense} from "react";

async function dynamicImport (path, ...props) {
    const module = await import(`components/${path}/${path}`);
    console.log(module.default)
    let component = module.default;
    return component;
}

export {dynamicImport};
