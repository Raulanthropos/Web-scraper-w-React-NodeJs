import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import "./scraper.css"
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
          'X-RapidAPI-Key': '6a2250bd3amshd8efeec2125e96ap183577jsn4bc807e173c0',
          'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
    try {
      const response = await fetch(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=15&autoCorrect=true`, options);
      const data = await response.json();
      console.log(data.value)
      setResults(data.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
<div style={{ textAlign: 'center' }}>
  <input
    type="text"
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    style={{ padding: '10px', fontSize: '18px' }}
  />
  <button onClick={handleSubmit} style={{ padding: '10px 20px', marginBottom: '20px', fontSize: '18px', marginLeft: '10px' }}>
    Search
  </button>
  {results.length > 0 && (
    <Card className='card'>
      <Row className="d-md-flex" xs={12} sm={6} md={3} lg={3} xl={3}>
      {results.map((result, index) => (
        <Col xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
          <img src={result.url} alt={index} style={{ width: '100%' }} />
          <p className='card-title'>{result.title}</p>
        </Col>
      ))}
    </Row>
    </Card>
)}
</div>
  );
};

export default SearchComponent;

