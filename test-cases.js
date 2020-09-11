const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const serialiser = require('node-serialize')
const should = chai.should();
let server = require('../index');



describe("request for getting all blog" , () => {

    it("return list of blog", (done) => {
      chai.request(server).get("/allblog").end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.should.have.property('status').eql('success');
            chai.expect(res.body.result).to.have.lengthOf(5)
            done();

        })
    })
  	it("return page 2 data", (done) => {
      chai.request(server).get("/allblog?page=2").end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.should.have.property('status').eql('success');
        	chai.expect(res.body.result).to.have.lengthOf(5)
            done();

        })
    })
  	it("return specific data according to search", (done) => {
      chai.request(server).get("/allblog?page=2&search='react").end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.should.have.property('status').eql('success');
            chai.expect(res.body.result).to.have.lengthOf(1)
            done()

        })
    })
})
describe("for posting blog",()=>{
    it('should return status as success with result', (done) => {
          const requestBody = {
              topic:"react",
              description:"react tutorial",
              posted_at:"13/07/2020",
              posted_by:"shubham",
          }
          chai.request(server).post('/post/blog').set('content-type', 'application/json').send(requestBody).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('status').eql('success');
                res.body.should.have.property('result').property('_id')
                    res.body.should.have.property('result').property('topic')
                    res.body.should.have.property('result').property('description')
                res.body.should.have.property('result').property('posted_at')
                res.body.should.have.property('result').property('posted_by')
                done();
          })
    })
    it('should return status failed if dataset is empty or incorrect', (done) => {
              const requestBody = {
              topic:"",
              description:"",
              posted_at:"",
              posted_by:"",
          }
              chai.request(server).post('/post/blog').set('content-type', 'application/json').send(requestBody).end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('failed');
              done();
          })
      })
})
describe("for update blog",()=>{
    it('should update a blog with particular id', (done) => {
          const requestBody = {
              topic:"react",
              description:"react tutorial",
              posted_at:"13/07/2020",
              posted_by:"shubham",
          }
          chai.request(server).put('/update/blog/1234').set('content-type', 'application/json').send(requestBody).end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('success');
              res.body.should.have.property('result').eql({
                  _id:"1234",
                    topic:"react",
                  description:"react tutorial",
                  posted_at:"13/07/2020",
                  posted_by:"shubham",
              });
              done();
          })
    })
    it('should return status failed if id is in incorrect', (done) => {
              const requestBody = {
              topic:"react",
              description:"react tutorial",
              posted_at:"13/07/2020",
              posted_by:"shubham",
          }
              chai.request(server).put('/update/blog/1235').set('content-type', 'application/json').send(requestBody).end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('failed');
              done();
          })
      })
  })
  describe("for deleting blog",()=>{
    it('should delete a blog with particular id', (done) => {
          chai.request(server).delete('/delete/blog/1234').end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('success');
              res.body.should.have.property('result').property('_id')
                    res.body.should.have.property('result').property('topic')
                    res.body.should.have.property('result').property('description')
                res.body.should.have.property('result').property('posted_at')
                res.body.should.have.property('result').property('posted_by')
              done();
          })
    })
    it('should return status failed if id is  incorrect', (done) => {
              chai.request(server).delete('/delete/blog/1235').end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('failed');
              done();
          })
      })
  })