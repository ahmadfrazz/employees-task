import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import { Button, Col, Input, Layout, Row, Typography } from 'antd';
import EmployeeTable from '../../Components/EmployeeTable/EmployeeTable';
import { useQuery } from '@apollo/client';
import { EMPLOYEES_QUERY } from '../../GraphQL/Queries';

function Dashboard() {

  const [searchTerm, setSearchTerm] = useState('');
  const [empData, setEmpData] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const { data, loading, error, fetchMore, refetch } = useQuery(EMPLOYEES_QUERY, {
    variables: { searchTerm },
    notifyOnNetworkStatusChange: true,
    skip: skipped
  });

  const handleSearch = () => {
    setSkipped(false);
    refetch({ searchTerm });
}

useEffect(() => {
  if (data) {
    setEmpData(data?.hrmEmployees.edges.map(edge => edge.node) || []);
    setHasNext(data.hrmEmployees.pageInfo.hasNextPage);
  }
}, [data]);

const handleLoadMore = () => {
  fetchMore({
    variables: {
      after: data.hrmEmployees.pageInfo.endCursor,
    },
    updateQuery: (prevResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return prevResult;
      return {
        hrmEmployees: {
          ...fetchMoreResult.hrmEmployees,
          edges: [...prevResult.hrmEmployees.edges, ...fetchMoreResult.hrmEmployees.edges],
        },
      };
    },
  });
};

const handleInputChange = (e) => {
  setSearchTerm(e.target.value);
  setSkipped(true);
  if(e.target.value === ''){
    setSkipped(false);
  }
}

//   {
//     id: '1',
//     name: 'John Brown',
//     designation: 'Vessel Inspector',
//     contact: '+996 562 5656 1214',
//     address: 'New York No. 1 Lake Park New York No. 1 Lake Park New York No. 1 Lake Park New York No. 1 Lake Park New York No. 1 Lake Park New York No. 1 Lake Park New York No. 1 Lake Park New York No. 1 Lake Park',
//     createdAt: '12/12/2023',
//     updatedAt: '12/12/2023'
//   },
//   {
//     id: '2',
//     name: 'Jim Green',
//     designation: 'Vessel',
//     contact: '+92 303 688376',
//     address: 'London No. 1 Lake Park',
//     createdAt: '12/12/2023',
//     updatedAt: '12/12/2023'
//   },
//   {
//     id: '3',
//     name: 'Joe Black',
//     designation: 'Vessel Inspector Vessel',
//     contact: '+996 562 5656 1214',
//     address: 'Sydney No. 1 Lake Park',
//     createdAt: '12/12/2023',
//     updatedAt: '12/12/2023'
//   },
//   {
//     id: '4',
//     name: 'Jim Red',
//     designation: 'Inspector',
//     contact: '+996 562 5656 1214',
//     address: 'London No. 2 Lake Park',
//     createdAt: '12/12/2023',
//     updatedAt: '12/12/2023'
//   },
// ];

  return (
    <>
        <Conatiner>
          <Row style={{
              padding: '20px'
          }}>
            <Col span={6}>
              <TotalText>
                Total {empData?.length}
              </TotalText>
            </Col>
            <Col span={10} offset={8} style={{display: 'flex'}}>
                <SearchBox
                  placeholder='Search by name or designation...'
                  onChange={handleInputChange}
                  value={searchTerm}
                  allowClear
                />
                <SearchButton onClick={handleSearch} disabled={!searchTerm}>
                    Search
                </SearchButton>
            </Col>
          </Row>

          <EmployeeTable data={empData} loading={loading} hasNext={hasNext} handleLoadMore={handleLoadMore} />

        </Conatiner>
        
    </>
  )
}

export default Dashboard;

const Conatiner = styled(Layout)(() => ({
  background: 'white',
  width: '100%',
  boxShadow: '0px 5px 15px #B7B7B733',
  border: '1px solid #F1F1F1',
  borderRadius: '6px',
  paddingBottom: '1px'
}));

const TotalText = styled(Typography)(() => ({
  fontSize: 'clamp(17px, 3vw, 20px)',
  fontFamily: 'GeneralSans-Medium',
  color: '#141433',
}));

const SearchBox = styled(Input)(() => ({
  width: '344px !important',
  height: '40px',
  boxShadow: '0px 5px 15px #B7B7B733',
  border: '1px solid #F1F1F1',
  borderRadius: '4px',
  '&:hover': {
      borderColor: '#3b3ec2',
    },
    "&:focus, &:active, &:focus-within": {
      borderColor: '#3b3ec2',
      boxShadow: '0px 5px 15px #B7B7B733',
    }
}));

const SearchButton = styled(Button)(({ disabled }) => ({
  width: '143px',
  height: '40px',
  marginLeft: '10px',
  backgroundColor: disabled ? '#d7d7d7 !important' : '#3B3EC2 !important',
  borderRadius: '4px',
  color: 'white !important',
  '&:hover': {
    backgroundColor: disabled ? '#d7d7d7 !important' : '#282cc7 !important',
  },
}));