/// <reference path="v4PrintDriver-Intellisense.js" />

function getSchemas(scriptContext, printerStream, schemaRequests, printerBidiSchemaResponses) {
    /// <summary>
    ///    Get the requested Schema(s).
    ///
    ///    The script can use the 'schemaRequests' object to iterate through the Query Keys requested by the user. Based on the query keys,
    ///    the script should use the 'printerStream' object to communicate with the USB print device and determine the values of one or more Bidi
    ///    Schema elements. For each Bidi Schema element the new value can be returned to the caller by using functions of the 'printerBidiSchemaResponses'
    ///    object. Once all query keys have been processed and all values added to the 'printerBidiSchemaResponses' object the script can return.
    ///
    ///    It is possible the attached device is not ready to return some of the requested data. In this case the function can return a value of 1 to indicate the call
    ///    should be retried after a wait.
    /// </summary>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printerStream" type="IPrinterScriptableSequentialStream">
    ///    Allows the script to Write/Read data from the attached USB device.
    /// </param>
    /// <param name="schemaRequests" type="Array">
    ///    Array of strings that contains all the requested Query Keys.
    ///    The syntax of each request is "<bidiQueryString>;<processingFunctionName>;<ledmResourceName>[;<queryString>]*"
    /// </param>
    /// <param name="printerBidiSchemaResponses" type="IPrinterBidiSchemaResponses">
    ///    Object the script will use to store all responses to query keys.
    /// </param>
    /// <returns type="Number" integer="true">
    ///     Integer value indicating function completion status.
    ///         1 - The attached device was not ready to provide some requested information. Call the function again using any Requery Keys added during processing.
    ///         0 - The script completed successfuly.
    /// </returns>

    var retVal = 0;
 
    ///
    /// Add IHV specific code here to produce Bidi Schema values based on the QueryKeys provided in the scheamRequests object.
    ///
    /// The code can use the printerStream object to write/read with the device to determine required data.
    ///
    /// All updated Bidi Schema values can then be returned by adding them to the printerBidiSchemaResponses object
    ///
    var pageCache = new PageCache(scriptContext, printerStream);
    var requestProcessor = new RequestProcessor(printerBidiSchemaResponses, pageCache);

    var i = 0;
    for (i = 0; i < schemaRequests.length; i++) {
        var args = schemaRequests[i].split(';', 4);

        if (args.length >= 4) {
            requestProcessor[args[1]](args[0], args[2], args[3]);
        }
    }
    return retVal;
}

function setSchema(scriptContext, printerStream, printerBidiSchemaElement) {
    /// <summary>
    ///    Set a requested Bidi Schema Value in the device.
    ///
    ///    The script can interpret the incoming Bidi Schema value to either set data in the device or perform an action on the device.
    ///
    ///    It is possible the attached device is not ready to process the specified data. In this case the function can return a value of 1 to indicate the call
    ///    should be retried after a wait.
    /// </summary>
    ///
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printerStream" type="IPrinterScriptableSequentialStream">
    ///    Allows the script to Write/Read data from the attached USB device.
    /// </param>
    /// <param name="printerBidiSchemaElement" type="IPrinterBidiSchemaElement">
    ///    Contains all the data associated with the Bidi Schema Value to set.
    /// </param>
    /// <returns type="Number" integer="true">
    ///     Integer value indicating function completion status.
    ///         1 - The attached device was not ready to process/set the requested schema.  After a wait the function should be called again with the supplied printerBidiSchemaElement.
    ///         0 - The script completed successfuly.
    /// </returns>
    var retVal = 0;


    ///
    /// Add IHV specific code here to set the Bidi Schema value in the provided printerBidiSchemaElement object.
    ///
    /// The code can use the printerStream object to write/read with the device to determine required data.
    ///

    return retVal;
}

function getStatus(scriptContext, printerStream, printerBidiSchemaResponses) {
    /// <summary>
    ///    Retrieve unsolicited Bidi Schema value updates from the USB device during printing.
    ///
    ///    This function is only called when a job is printing. A device can provide data on the read channel which this script can interpret into
    ///    Bidi Schema values and returned to USBMon.
    ///
    ///    This function will be called repeatedly during printing. It is expected the device will only return data if it is available and the script can understand it.
    ///    If the device does not support querying for unsolicited status or the script can determine that there is no need to call this function again, the script can return
    ///    a value of 2 which will tell the getStatus execution thread in USBMon to exit successfully.
    ///
    ///    If the print device does not support retrieving status during a print job this function should be left out of the driver's JavaScipt file altogether. This will inform 
    ///    USBMon to skip invocation of the function.
    /// </summary>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///    Accessor for PropertyBags for printer driver and queue properties.
    /// </param>
    /// <param name="printerStream" type="IPrinterScriptableSequentialStream">
    ///    Allows the script to read data from the attached USB device. Calling the write function will fail. This device is opened read-only for this function.
    /// </param>
    /// <param name="printerBidiSchemaResponses" type="IPrinterBidiSchemaResponses">
    ///    Object the script will use to store all status responses.
    /// </param>
    /// <returns type="Number" integer="true">
    ///     Integer value indicating function completion status.
    ///         2 - The device no longer (if ever) supports unsolicited status so no need for USBMon to make more calls to this function.
    ///         0 - The script completed successfuly.
    /// </returns>

    var retVal = 2;
    ///
    /// Add IHV specific code here to read from the device and interpret data into Bidi Schema values
    ///
    /// The code can use the printerStream object to read from the device to determine required data.
    ///
    /// All updated Bidi Schema values can then be returned by adding them to the printerBidiSchemaResponses object
    ///
    return retVal;
}

function requestStatus(scriptContext, printerStream, printerBidiSchemaResponses) {
    /// <returns type="Number" integer="true">
    ///     Integer value indicating function completion status.
    ///         2 - The device no longer (if ever) supports solicited status so no need for USBMon to make more calls to this function.
    ///         0 - The script completed successfuly.
    /// </returns>

    var retVal = 0;
    var pageCache = new PageCache(scriptContext, printerStream);
    var requestProcessor = new RequestProcessor(printerBidiSchemaResponses, pageCache);
   
    // Get the status information and report it
    var statusContent = pageCache.GetContent("/DevMgmt/ProductStatusDyn.xml", false);
    var statusMsg = "";

    //Step 1: Look for psdyn:Alert; Get the postion of this node and save.
    var pos = 0;
    var bFound = false;
    var startTag = "psdyn:Alert";
    var endTag = "/psdyn:Alert";
    pos = statusContent.indexOf(startTag, pos);
    var endPos = 0;
    do {

        endPos = statusContent.indexOf(endTag, pos);
        if (endPos == -1)
            break;
        var slicedXML = statusContent.slice(pos - 1, statusContent.length);
        var statusValue = requestProcessor.InnerXml(startTag, slicedXML);
        if (statusValue == "")
            break;

        var error = requestProcessor.InnerXml("ad:Severity", statusValue);
        if (error == "Error") {
            //We got what we need .. so break
            statusMsg = requestProcessor.InnerXml("ad:ProductStatusAlertID", slicedXML);
            bFound = true;
            break;
        }
    }
    while (-1 != (pos = statusContent.indexOf("psdyn:Alert", endPos + endTag.length)));

    if (bFound && (statusMsg != null) &&(statusMsg != "")) {
        if (statusMsg.toUpperCase() == "closeDoorOrCover".toUpperCase())
            printerBidiSchemaResponses.addString('\\Printer.Status.Summary:StateReason', 'closeDoorOrCover');
        else if (statusMsg.toUpperCase() == "trayEmptyOrOpen".toUpperCase())
            printerBidiSchemaResponses.addString('\\Printer.Status.Summary:StateReason', 'trayEmptyOrOpen');
        else if (statusMsg.toUpperCase() == "jamInPrinter".toUpperCase())
            printerBidiSchemaResponses.addString('\\Printer.Status.Summary:StateReason', 'jamInPrinter');
        else if ((statusMsg.toUpperCase() == "cartridgeMissing".toUpperCase()))
            printerBidiSchemaResponses.addString('\\Printer.Status.Summary:StateReason', 'cartridgeMissing');
        else if ((statusMsg.toUpperCase() == "insertNonSETUPCartridge".toUpperCase()) ||
                (statusMsg.toUpperCase() == "cartridgeIncorrect".toUpperCase()) ||
                (statusMsg.toUpperCase() == "incompatiblePrintHead".toUpperCase()))
             printerBidiSchemaResponses.addString('\\Printer.Status.Summary:StateReason', 'cartridgeIncorrect');
        else if (statusMsg.toUpperCase() == "outputBinFull".toUpperCase())
            printerBidiSchemaResponses.addString('\\Printer.Status.Summary:StateReason', 'outputBinFull');
        else if ((statusMsg.toUpperCase() == "replaceCartridgeOut".toUpperCase())
                || (statusMsg.toUpperCase() == "cartridgeLow".toUpperCase())
                || (statusMsg.toUpperCase() == "cartridgeVeryLow").toUpperCase())
            printerBidiSchemaResponses.addString('\\Printer.Status.Summary:StateReason', 'cartridgeLow');
        else if (statusMsg.toUpperCase() == "printerError".toUpperCase())
            printerBidiSchemaResponses.addString('\\Printer.Status.Summary:StateReason', 'printerError');


        
    }
    else {
        printerBidiSchemaResponses.addString('\\Printer.Status.Summary:StateReason', 'None');
    }
   
    return retVal;
}

var PrinterBidiSchemaElementType = {
    PrinterBidiSchemaElementType_Null: 0,
    PrinterBidiSchemaElementType_Int: 1,
    PrinterBidiSchemaElementType_Float: 2,
    PrinterBidiSchemaElementType_Bool: 3,
    PrinterBidiSchemaElementType_String: 4,
    PrinterBidiSchemaElementType_Text: 5,
    PrinterBidiSchemaElementType_Enum: 6,
    PrinterBidiSchemaElementType_Blob: 7
};

PageCache = function (scriptContext, printerStream) {
    /// <summary>
    /// PageCache Constructor 
    /// The PageCache maintains an array of page content that has been fetched from the printerStream.
    /// This content can be retrieved upon demand.  if the requested content is not available in the 
    /// cache then it is fetched from the device and placed in the cache (unless excluded) before
    /// returning it.  The content may also be placed in the UserCache in the ScriptContext if needed.
    /// </summary>    
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///   Accessor for PropertyBags for printer driver and queue properties
    /// </param>
    /// <param name="printerStream" type="IPrinterScriptableSequentialStream">
    ///   Allows the script to write/read data from the attached USB device.
    /// </param>
    /// <returns type="PageCache">
    ///   a PageCache object
    /// </returns>
    ///this.UserBag = scriptContext.UserProperties;
    this.UserBag = null;
    this.printerStream = printerStream;
    this.ContentArray = [];
    this.PendingData = "";
};
PageCache.prototype.GetContent = function (contentName, saveInCache) {    
    /// TODO Implement aged caching in the UserBag so that we can save the content across invocations
    var content = this["FetchLedmContent"](contentName);
    if ((content != undefined) && saveInCache) {
        this["SetContent"](contentName, content);
    }

    return content;
};

PageCache.prototype.SetContent = function(contentName, content) {
    this.ContentArray[contentName] = content;
};

PageCache.prototype.FetchLedmContent = function(contentName) {
    var ledmReq =[];

    ledmReq = this["GetLedmHtmlRequest"](contentName);

    // Write takes in a byte array.
    var bytesWritten = this.printerStream.write(ledmReq);

    var ledmResponse = " ";

    var htmlHeader = this["ReadHtmlHeader"]();

    if (-1 != htmlHeader.indexOf("Content-Length")) 
    {
        // Get the content length and read that much data
        ledmResponse = this["ReadResponse"](htmlHeader);
    } 
    else if (-1 != htmlHeader.indexOf("Transfer-Encoding")) 
    {
        // Read all the chunks and concatenate all of the data
        ledmResponse = this["ReadChunkedResponse"](contentName);
    }

    return ledmResponse;
};


PageCache.prototype.GetLedmHtmlRequest = function (contentName) {
    var requestStr = "GET ".concat(contentName, " HTTP/1.1\r\nHOST:\r\n\r\n");
    
    var request = new Array(requestStr.length);
    for (var i = 0; i < requestStr.length; i++)
        request[i] = requestStr.charCodeAt(i);

    return request;
};

PageCache.prototype.ReadHtmlHeader = function () {
    // read one character at a time until we
    // find a double line-feed (/r/n/r/n) - that will always mark the end of the header

    var readHeader = "";
    var headerEnd = -1;
    var txt = "";
    var readmore = true;

    var now = new Date().getTime();
    var endTime = now + 10000;

    // if complete header has been send by the device
    while ((readmore) && (endTime > now)) {

        now = new Date().getTime();
        
        // Read the response.
        readBuffer = this.printerStream.read(512);
        var bytesRead = readBuffer.length;

        for (i = 0; i < bytesRead; i++) {
            readHeader += String.fromCharCode(readBuffer.shift());
        }

        if (0 < bytesRead) {
            // In the response if we dont get HTTP 200, then we are NOT reading the response for our request.
            headerEnd = readHeader.indexOf("HTTP/1.1");

            if (-1 != headerEnd) {
                // This means we have found our requests response. Now try to get the double line feed to read till end of header.
                headerEnd = readHeader.indexOf("\r\n\r\n");
                if (headerEnd == -1) 
                {
                    now = new Date().getTime();
                    // We need to read more data to read till end of header
                    continue;
                }
                else 
                {
                    this.PendingData = readHeader.slice(headerEnd + 4, readHeader.length);
                    // We have read till the header end. Dont read anymore.
                    readmore = false;
		    break;
                }
            }
            else 
            {
                now = new Date().getTime();
                // This means we are reading the response of an earlier request.
                readHeader = "";
                continue;
            }
        }
        else 
        {
            sleep(1000);
            now = new Date().getTime();
            continue;
        }
    }

    return readHeader;
};

PageCache.prototype.ReadResponse = function (htmlHeader) {
    // Extract the content length from the header
    var index = htmlHeader.indexOf("\r\n\r\n") + 4;

    // Save the content that we read after the header (if there is any)
    var actualXMLcontent = htmlHeader.slice(index);
    var contentLengthIndex = htmlHeader.indexOf("Content-Length");
    // Separate the content length value
    var lengthStr = htmlHeader.substring(contentLengthIndex + 15);
    lengthStr = lengthStr.substring(0, lengthStr.indexOf("\r\n"));

    // The remaining length is the content length - the carried over length from the header
    var readLength = new Number(lengthStr)  ;
    // Read the bytes
    var bytes = 512;
    var readResponse = actualXMLcontent;
    do {
        readBuffer = this.printerStream.read(bytes);

        var bytesRead = readBuffer.length;

        for (i = 0; i < bytesRead; i++) {
            // fromCharCode converts from unicode into ascii
            readResponse += String.fromCharCode(readBuffer.shift());
        }

    } while (readResponse.length < readLength);    // Convert it to a string and return it

    return readResponse;
};

PageCache.prototype.ReadChunkedResponse = function (contentName) {
    // Read each chunck
    var readResponse = this.PendingData;
    var responseEnd = -1;
    var txt = "";

    var lastChunk = false;
    var now = new Date().getTime();
    var endTime = now + 10000;

    var sizeToRead = 0;
    var additionalRead = 0;

    if (this.PendingData.length == 0) {
        sizeToRead = 512;
    }

    var skipLocalStore = true;

    while ((false == lastChunk) && (endTime > now)) {
        now = new Date().getTime();

        var localBuff = "";
        var bytesRead = 0;

        if (sizeToRead != 0) {

            if (sizeToRead < 512) {
                additionalRead = 512 - sizeToRead;
                sizeToRead = 512;
                skipLocalStore = true;
            }

            readBuffer = this.printerStream.read(sizeToRead);
            bytesRead = readBuffer.length;

            if (bytesRead == 0) {

                if (additionalRead != 0) {
                    sizeToRead = 512 - additionalRead;
                    additionalRead = 0;
                }
                continue;
            }

            for (i = 0; i < bytesRead; i++) {
                if (true == skipLocalStore) {
                    localBuff += String.fromCharCode(readBuffer.shift());
                }
                else {
                    readResponse += String.fromCharCode(readBuffer.shift());
                }
            }

            if (additionalRead != 0) {
                if ((bytesRead == sizeToRead)) {
                    readResponse += localBuff.slice(0, 512 - additionalRead);
                    localBuff = localBuff.slice(512 - additionalRead, 512);
                }
                else if ((bytesRead < sizeToRead) && (sizeToRead > (512 - additionalRead))) {
                    readResponse += localBuff.slice(0, 512 - additionalRead);
                    localBuff = localBuff.slice(512 - additionalRead, bytesRead);
                    if (localBuff == "" ) {
                        additionalRead = 0;
                        continue;
                    }
                }
                //additionalRead = 0;
            }

        }
        else {
            localBuff = readResponse;
            bytesRead = 0;
            /*This code was meant to be hit only if there is some data in PendingData.
            However this code gets hit when we have a self contained chunk.i.e data fits in 1 chunk.
            Hence here we need not store it in readResponse. Also we shouldn't reset readResponse
            if skiplocalstore is false as then we will be resetting the actual response.
            Also bytesRead should be set to 0 so that we read the next chunk*/
            if (skipLocalStore == true) {
                bytesRead = readResponse.length;
                readResponse = "";
            }
        }

        if (true == skipLocalStore) {
            readResponse += localBuff;

            responseEnd = localBuff.indexOf("\r\n");
            if (responseEnd == -1) {
                return readResponse;
            }

            var chunksize = parseInt(localBuff.slice(0, responseEnd), 16);

            // Last chunk having 0 size.
            if (chunksize == 0) {
                lastChunk = true;
            }

            // Calculate the next chunk size pending to be read.
            if (additionalRead != 0) {
                sizeToRead = chunksize + 2 - (additionalRead - responseEnd) + 2;
                additionalRead = 0;
            }
            else {
                sizeToRead = chunksize + 2 - (bytesRead - responseEnd) + 2;
            }
            skipLocalStore = false;
            continue;
        }

        // For cases where the complete chunk is not read, then read the remaining bytes in the chunk.
        if ((skipLocalStore != true) && (bytesRead < sizeToRead)) {
            sizeToRead = sizeToRead - bytesRead;
        }
        // if we have read all the bytes in the current chunk, then read the next chunk size.
        else if ((skipLocalStore != true) && (bytesRead == sizeToRead)) {
            // Read the line feed.
            skipLocalStore = true;
            sizeToRead = 512;
        }
    }

    return readResponse;
};

RequestProcessor = function(printerBidiSchemaResponses, pageCache) {
    /// <summary>
    /// RequestProcessor Constructor
    /// The RequestProcessor contains the functions used to process requests
    /// it provides access to the IPrinterBidiSchemaResponses object for sending back responses
    /// </summary>
    /// <param name="printerBidiSchemaResponses" type="IPrinterBidiSchemaResponses">
    ///   the responses object passed into the getSchema function
    /// </param>
    /// <returns type="RequestProcessor">
    ///   a RequestProcessor object
    /// </returns>
    this.responses = printerBidiSchemaResponses;
    this.pageCache = pageCache;
};

RequestProcessor.prototype.XPathBool = function (bidiQueryStr, contentName, queryArray) {
    var content = "";
    content = this.pageCache.GetContent(contentName, true);

    var result = false;
    var option = "";
    /// TODO Implement a common XPath Evaluator function
    var args = queryArray.split(",");
    for (i = 0; i < args.length; i++) {
        if (-1 != content.indexOf(args[i])) {
            option = this.InnerXml(args[i], content);
            if (option != null) {
                if ((option.toUpperCase() == "Installed".toUpperCase())
                    || (option.toUpperCase() == "Enabled".toUpperCase())
                    || (option.toUpperCase() == "PhotoTray".toUpperCase())) {
                    result = true;
                    break;
                }
            }
        }
    }
    /// determine whether the result is true and set its value
    /// TODO Implement the XPath evaluation 

    this.responses.AddBool(bidiQueryStr, result);
};

RequestProcessor.prototype.XPathString = function(bidiQueryStr, contentName, queryArray) {
    /// TODO Implement XPathString function
};

RequestProcessor.prototype.StrContainsBool = function (bidiQueryStr, contentName, queryArray) {
    var content = this.pageCache.GetContent(contentName, true);

    var result = false;
    //In content look for <dd:queryArray[i]></dd:queryArray[i]>
    if (content.indexOf(queryArray[0]) >= 0) {
        var data = InnerXml(queryArray[i], content);
        if (data == "Enabled" || data == "Installed")
            result = true;

        /* result = true;*/
    }

    this.responses.AddBool(bidiQueryStr, result);
};


RequestProcessor.prototype.InnerXml = function (tag, xml) {
    var openRe = new RegExp("<" + tag + ">", "gm");
    var closeRe = new RegExp("</" + tag + ">", "gm");

    if (openRe.test(xml) && closeRe.test(xml)) {
        var inner = '';
        inner = xml.substring(openRe.lastIndex, closeRe.lastIndex - tag.length - 3);
       // this.content = xml.substring(closeRe.lastIndex);
        return inner;
    }

    return null;
};

function sleep(milliSeconds){
    var startTime = new Date().getTime(); // get the current time
    while (new Date().getTime() < startTime + milliSeconds); // hog cpu
}

function clearBuffer(printerStream) {
    var retVal = false;
    if (printerStream == null) {
        return retVal;
    }

    var txt = "";
    try {
        // Read the buffer to empty if any thing is there in device
        // from previous call
        // This causes a HANG on OJ6700 and PS7520 INKJET devices. Need to re-look.
        var initialReadBuffer = printerStream.read(512);
        var initialBytesRead = initialReadBuffer.length;
        while (initialBytesRead != 0) {
            initialReadBuffer = printerStream.read(512);
            initialBytesRead = initialReadBuffer.length;
        }
        retVal = true;
    }
    catch (err) {
        txt += err.message;
    }

    return retVal;
}
