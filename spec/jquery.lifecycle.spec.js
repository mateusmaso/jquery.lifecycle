if (navigator.userAgent.indexOf('PhantomJS') < 0)
  describe("jquery.lifecycle", function() {
    beforeEach(function() {
      this.element = $("<element>");
      this.fixtures = $("#fixtures");
    });

    afterEach(function() {
      this.fixtures.empty();
    });

    it("should trigger insert event", function(done) {
      this.element.lifecycle({
        insert: function() {
          chai.expect($.contains(document.body, this)).to.be.true;
          done();
        }
      });
      this.element.appendTo(this.fixtures);
    });

    it("should trigger change event", function(done) {
      this.element.lifecycle({
        change: function(attribute, value) {
          chai.expect($(this).attr(attribute)).to.be.equal(value);
          done();
        }
      });
      this.element.appendTo(this.fixtures);
      this.element.attr("foo", "bar");
    });

    it("should trigger remove event", function(done) {
      this.element.lifecycle({
        remove: function() {
          chai.expect($.contains(document.body, this)).to.be.false;
          done();
        }
      });
      this.element.appendTo(this.fixtures);
      this.element.remove();
    });
  });