//
// Copyright (c) 2013 Christopher Baker <https://christopherbaker.net>
//
// SPDX-License-Identifier:    MIT
//


#include "ofApp.h"


void ofApp::setup()
{
    receive.setup(PORT); 

    // Setup printer.
    if (!printer.setup(38400))
    {
        ofLogError("ofApp::setup") << "Unable to connect to: " << printer.port();
        ofExit();
    }
    else
    {
        ofLogNotice("ofApp::setup") << "Connected to: " << printer.port();
    }

    // Set up hardware flow control if needed.
    printer.setDataTerminalReady();
    printer.setRequestToSend();

    // Initialize the printer.
    printer.initialize();
    printer.flush();
  
    // Set initial properties for the printer.
    printer.setLineSpacing(0);
    printer.setFont(ESCPOS::BaseCodes::FONT_B);
    printer.setAlign(ESCPOS::BaseCodes::ALIGN_CENTER);
}

void ofApp::update() {
  while (receive.hasWaitingMessages()) {
    ofxOscMessage m;
    // Set the next message.
    #pragma warning(disable: WARNING_CODE)
    receive.getNextMessage(&m);
    
    cout << m << endl; 
  }
}

void ofApp::draw()
{
    ofBackgroundGradient(ofColor::white, ofColor::black);
    ofSetColor(255);
    ofDrawBitmapStringHighlight("Press any key for a test print.", ofVec2f(20, 30));
}

void ofApp::keyPressed(int key)
{
    cout << "Hello" << endl;
    for (int i = 0; i < 5000; i++) {
      if (ofRandom(1) < 0.5) {
        printer.setInvert(true);
        printer.print(" ");
      } else {
        printer.setInvert(false);
        printer.print(" ");
      }
    }
    printer.cut(ESCPOS::BaseCodes::CUT_PARTIAL);
    printer.println(" ");
    printer.cut(ESCPOS::BaseCodes::CUT_FULL);
    printer.println(" ");
}
