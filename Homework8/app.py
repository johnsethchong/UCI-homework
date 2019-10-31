import numpy as np
import pandas as pd
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# We can view all of the classes that automap found
Base.classes.keys()

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end>"
    )

@app.route("/api/v1.0/precipitation")
def precipitation():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    #Convert the query results to a Dictionary using `date` as the key and `prcp` as the value

    all_prcp = session.query(Measurement.date, Measurement.prcp).all()

    session.close()

    # Create a dictionary from the row data and append to a list of
    prcp_list = []
    for date, prcp in all_prcp:
        prcp_dict = {}
        prcp_dict["date"] = date
        prcp_dict["precipitation"] = prcp
        prcp_list.append(prcp_dict)
    #Return a JSON
    return jsonify(prcp_list)

@app.route("/api/v1.0/stations")
#List of stations from the dataset
def stations():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    all_stations = session.query(Station.station, Station.name).all()

    session.close()

    # Create a dictionary from the row data and append to a list of
    station_list = []
    for station, name in all_stations:
        station_dict = {}
        station_dict["station"] = station
        station_dict["name"] = name
        station_list.append(station_dict)
    #Return a JSON
    return jsonify(station_list)

@app.route("/api/v1.0/tobs")
#Query for the dates and temperature observations from a year from the last data point
def tobs():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    past_yr_date = session.query(Measurement.date).order_by(Measurement.date.desc()).first()
    one_yr_ago=dt.date(2017,8,23) - dt.timedelta(days=365)
    all_tobs = session.query(Measurement.date, Measurement.tobs).filter(Measurement.date >= one_yr_ago).group_by(Measurement.date).all()
    
    session.close()
    
    #Return a JSON list of Temperature Observations (tobs) for the previous year
    tobs_list = []
    for date, temperature in all_tobs:
        tobs_dict = {}
        tobs_dict["date"] = date
        tobs_dict["temperature"] = temperature
        tobs_list.append(tobs_dict)

    #Return a JSON
    return jsonify(tobs_list)





if __name__ == '__main__':
    app.run(debug=True)
