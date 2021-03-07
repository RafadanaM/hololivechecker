# hololivechecker
NodeJs app to check whether hololive members are live streaming or not using web scraping(no youtube api needed).
Can be used for other channels as well

-I know Hololive has an official schedule website for their streamers but I was bored okay.


## Usage:

  localhost:5000/hololive?gen=hololivegeneration for all gen except all
  -OR-
  localhost:5000/hololive?gen=hololivegeneration&page=number for gen == all

  hololivegeneration = jpzero, jpfirst, jpsecond, jpthird, jpfourth, jpfifth, jpgamers, enfirst, idfirst, idsecond, all
  number = basically a number

## Example:
  To get JP first gen:
   localhost:5000/hololive?gen=jpfirst
   
  To get all member(with pagination):
      localhost:5000/hololive?gen=all&page=1 


