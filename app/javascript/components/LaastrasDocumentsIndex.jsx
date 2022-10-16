import React from "react"
import PropTypes from "prop-types"

class LaastrasDocumentsIndex extends React.Component 
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div class="shadow-sm p-1 mb-2 bg-white rounded">
                            <div style={{padding: '10px', fontWeight: 'bold', color: 'blue'}}>
                                {this.props.laastras_documents_title}
                            </div>
                            <hr />
                            <div style={{padding: '10px'}} id="laastras-docs-text">
                                <ul>
                                {
                                    this.props.laastras_documents.map((doc, idx) => 
                                        <li key={`doc-key-${idx}`} style={{margin: '8px'}}>
                                            <a href={doc.uri} style={{textDecoration: 'none'}}> {doc.filename} </a>
                                        </li>
                                    )
                                }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    } // render

    componentDidMount()
    {

    } // componentDidMount

}

LaastrasDocumentsIndex.propTypes = {
    laastras_documents_title: PropTypes.string,
    laastras_documents: PropTypes.array
}

export default LaastrasDocumentsIndex