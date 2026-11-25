export function setPrevPage() {
    const oldPagesList = JSON.parse(localStorage.getItem('pagesList'));

    const currentLink = window.location.pathname + (window.location.search && window.location.search);
    const prevLink = oldPagesList ? oldPagesList.current : '/';

    const errors = {
        linkExist: currentLink === prevLink,
        multipleProjectPages: currentLink.includes('project') && prevLink.includes('project')   
    }

    if (errors.linkExist || errors.multipleProjectPages) {
        return
    }

    localStorage.setItem('pagesList', JSON.stringify({
        current: currentLink,
        prev: prevLink
    }))
}