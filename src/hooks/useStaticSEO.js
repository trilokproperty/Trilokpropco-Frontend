import { useEffect } from "react";

const useStaticSEO = (metadata) => {
    useEffect(() => {
        if (!metadata) return;

        document.title = metadata.title || "Trilok Propco | Best Real Estate Agent in Kolkata";

        const metaTags = [
            { name: "description", content: metadata.description },
            { property: "og:title", content: metadata.title },
            { property: "og:description", content: metadata.description },
            { property: "og:image", content: metadata.image },
            { property: "og:url", content: metadata.url },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: metadata.title },
            { name: "twitter:description", content: metadata.description },
            { name: "twitter:image", content: metadata.image },
            { rel: "canonical", href: metadata.url }
        ];

        metaTags.forEach(tag => {
            let element = document.querySelector(`meta[${tag.name ? `name="${tag.name}"` : `property="${tag.property}"`}]`);
            
            if (!element) {
                element = document.createElement(tag.name ? "meta" : "link");
                if (tag.name) element.setAttribute("name", tag.name);
                if (tag.property) element.setAttribute("property", tag.property);
                if (tag.rel) element.setAttribute("rel", tag.rel);
                document.head.appendChild(element);
            }
            
            element.setAttribute("content", tag.content || "");
        });
    }, [metadata]);
};

export default useStaticSEO;
