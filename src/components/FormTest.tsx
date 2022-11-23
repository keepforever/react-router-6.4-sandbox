type Props = {}

export const FormTest = ({}: Props) => {
  // basic address form
  return (
    <form>
      <div className="form-group">
        <label htmlFor="txtFname" aria-label="please enter your first name, it is a required field">
          First name:*
        </label>
        <input className="form-control" required id="txtFname" type="text" />
      </div>

      <div className="form-group">
        <label id="lblDOB" htmlFor="txtDOB">
          D.O.B{' '}
        </label>
        <input className="form-control" type="text" id="txtDOB" aria-labelledby="lblDOB spanTxtDOB" />
        <span id="spanTxtDOB">MM/DD/YYYY</span>
      </div>
      <h3 id="lblHeader">Your fav brand:</h3>
      <div role="group" aria-labelledby="lblHeader">
        <input type="checkbox" id="chkBrand1" name="brand1" value="GAP" />
        <label htmlFor="chkBrand1">GAP</label>
        <input type="checkbox" id="chkBrand2" name="brand2" value="Tommy" />
        <label htmlFor="chkBrand2">Tommy</label>
        <input type="checkbox" id="chkBrand3" name="brand3" value="HM" />
        <label htmlFor="chkBrand3">H&M</label>
      </div>
      <div className="row">
        <div className="col-xs-6">
          <button type="button" id="btnCancel" className="btn btn-secondary">
            Cancel
          </button>
        </div>
        <div className="col-xs-6 text-right">
          <button id="btnSave" className="btn btn-primary btn-success" aria-label="save your prefrences">
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
