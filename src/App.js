import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Card, Col, Row } from "antd";
import { Spin } from "antd";
import { Tag } from "antd";
import moment from "moment";
import {
  useQuery,
  gql,
} from "@apollo/client";
import "./App.css";
import logo from './logo.svg'

const { Meta } = Card;

const { Header, Footer, Sider, Content } = Layout;
const App = () => { 

  const QUERY = gql`
    {
      launchesPast(limit: 12) {
        rocket {
          rocket_name
          rocket_type
        }
        details
        links {
          flickr_images
          article_link
        }
        launch_date_utc
      }
    }
  `;
  const { loading, error, data } = useQuery(QUERY);

  return (
    <>
      <Layout className="layout">
        <Header className="header" style={{ display: "flex", zIndex: 10}}>
          <img className="logo" src={logo} />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            {loading ? (
              <Spin size="large" className="spinner" />
            ) : (
              <Row gutter={[80, 80]}>
                {data.launchesPast.map((d) =>{
                  if(d.links.flickr_images.length > 0 && d.links.article_link){
                  return (
                    <Col span={4}>
                      <Card
                        hoverable
                        style={{ width: "100%", overflow: "hidden" }}
                        className="card"
                        cover={
                          <img
                            style={{ height: 200, objectFit: "cover" }}
                            src={d.links.flickr_images[0]}
                          />
                        }
                        onClick={()=>window.location.assign(`${d.links.article_link}`)}
                      >
                        <Meta
                          title={d.rocket.rocket_name}
                          description={
                            <React.Fragment>
                              <Tag color="geekblue">{d.rocket.rocket_type}</Tag>
                              <Tag color="purple">{moment(d.launch_date_utc).fromNow()}</Tag>
                            </React.Fragment>
                          }
                        />
                      </Card>
                    </Col>
                  );
                  }
                }
                )}
              </Row>
            )}
          </div>
        </Content>
        <Footer
          style={{
            marginTop: "auto",
            textAlign: "center",
            background: "#e0e0e0",
          }}
        >
          React-GQL
        </Footer>
      </Layout>
    </>
  );}

export default App;
