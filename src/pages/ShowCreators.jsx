import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from '../components/TestingCard'
import { Link } from 'react-router-dom'
import '@picocss/pico'
const ShowCreators = ({data}) => {
    const [creators, setCreators] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
    useEffect(() => {
        setCreators(data)
    }, [data])
     const handleNextPage = () => {
    if (currentPage < getTotalPages()) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const getTotalPages = () => {
    return Math.ceil(creators.length / itemsPerPage);
  };

  const paginatedCreators = creators.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
        <>
          <section style={{ padding: "10px", display: "flex", flexDirection: "column", flexWrap: "wrap", justifyContent: "center" }}>
            {paginatedCreators && paginatedCreators.length > 0 ? (
          paginatedCreators.map((creator) => <Card key={creator.id} id={creator.id} name={creator.name} youtube={creator.youtube} twitter={creator.twitter} instagram={creator.instagram} description={creator.description} imageURL={creator.imageURL} url={creator.url} />)
        ) : (
          <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <h3>{'No Creators Yet 😞'}</h3>
            <button style={{}}>
              <Link to={'/new'} style={{ color: 'white' }}>
                {'Add a Creator'}
              </Link>
            </button>
          </div>
        )}
        {currentPage === getTotalPages() && (
          <Link to={'/new'} style={{ color: 'white' }}>
            <button style={{}}>
              {'Add a Creator'}
            </button>
          </Link>)}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px',alignItems:"center" }}>
          <button onClick={handlePrevPage} disabled={currentPage === 1} style={{width:"300px"}}>
            {'Previous Page'}
          </button>
          <p style={{ margin: '0 10px', }}>
            {'Page'} {currentPage} {'of'} {getTotalPages()}
          </p>
          <button onClick={handleNextPage} disabled={currentPage === getTotalPages()} style={{width:"300px",}}>
            {'Next Page'}
          </button>
        </div>
        </section>
    </>
  )
}
ShowCreators.propTypes = {
    data: PropTypes.array.isRequired,
}
export default ShowCreators