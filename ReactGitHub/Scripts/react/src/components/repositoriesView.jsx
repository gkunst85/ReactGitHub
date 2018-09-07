const RepositoriesView = (props) => {

    const { items, onBookmark } = props;

    return (
        <div className="row">
            {items.map(item => {
                let classes = "fa fa-bookmark";
                classes += item.bookmarked ? "" : "-o";

                return (
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <img className="img-fluid mb-3" src={item.owner.avatar_url} />
                                <h5 className="card-title">{item.name}</h5>
                                <i className={classes} aria-hidden="true" onClick={() => onBookmark(item)}></i><br />
                            </div>
                        </div>
                    </div>)
            })}
        </div>
    )
}
