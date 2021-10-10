
export let elements = {
    // The elements
    'row':      {
        'start_tag': "<div>",
        'end_tag':   "</div>",
        'classes':     "row",
    },
    'col':{
        'start_tag': "<div>",
        'end_tag':   "</div>",
        'classes':     "col",
    },
    'panel': {
        'start_tag': "<div>",
        'end_tag':   "</div>",
        'classes':     "panel",
    },
    'list': {
        'start_tag': "<ul data-selected='none'>",
        'end_tag':   "</ul>",
        'classes':   "list-group"
    },
    'list-item': {
        'start_tag': "<li onclick=app.select(event,this.id)>",
        'end_tag':   "</li>",
        'classes':   "list-group-item"
    }
};
