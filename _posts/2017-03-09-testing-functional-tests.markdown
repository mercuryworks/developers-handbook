---
layout: post
title: "Functional Tests"
author: Matt Condor
authorTitle: Application Developer
date: 2017-03-09 
lastUpdated: 2017-03-09
categories: testing
permalink: /testing/functional-test
order: 130.20
child: true
---
# Functional Tests

Functional Tests are created to automate the experience of a user accessing a web application and physically testing the different functions of that web application.  This can range from viewing things on the website, navigating through the website, or performing the specific tasks afforded by the website.  Functional test are run in an environment as a condition of a successful release of new code to that environment.  

This allows for the development team to create new code and build an application without having to physically test each part of the existing application with each new release.

The test mimic the experience that a user has, in an environment outside of the developer machine.  

#### Functional Test Lifecycle 

A functional test project is created with appropriate NuGet packages, runsettings files, and base test included. 

Test are written to test against the site for which the project is written.  

The functional test project is built with the project and setup to run the test as a part of a release to a new environment. 

The Nunit test adapter runs and finds all the test written in that project, and finds the level of parallelization for the tests. 

The Webdriver in the test creates a new instance of a browser on the selenium grid through the Webdriver setup. 

The driver moves through the test performing the actions outlined in the test. 

If an action cannot complete or an assertion is incorrect the test will fail, if not the test passes. 

## Interface Tests and Applitools 

Applitools is a paid service that is connected to in the functional tests which captures and stores screenshots taken during the time of a test, and compares those screenshots to previous versions to capture any differences between the two.  Applitools will detect UI changes and flag them, making sure that someone approves the changes before moving forward with a release.

The test is constructed in the same way as Selenium Webdriver tests, in visual studio and run with the Nunit test adapter on the Selenium Grid. 

The differentiating point is that the screenshots captured use Applitools to make the comparisons.

One great application for this method is capturing style guides of websites to highlight any UI changes that may be encountered when making changes to the web application. 

Style guides, home pages, and things like Google Maps are common places that we employ interface tests.

![Applitools 1](/assets/images/Applitools1.png)
![Applitools 2](/assets/images/Applitools2.png)

#### Creating an Interface Test
 
```csharp
namespace HWH.FunctionalTests
{
    [TestFixture]
    [Parallelizable(ParallelScope.Fixtures)]
    public class InterfaceHomeTest : BaseSetup
    {
        [SetUp]
        public void Init()
        {
            driver = Driver.Setup();
            eyes = Driver.EyesSetup();
            eyes.Open(driver, Driver.AppliToolsAppName, Driver.TestName);
        }

        [Test]
        public void InterfaceHome()
        {
            NavigationActions.GoToURL(driver, Driver.WebAppUrl);

            WaitActions.Wait(driver).Until(ExpectedConditions.ElementIsVisible(By.ClassName("ContentWrapper")));

            eyes.CheckWindow(WaitActions.CustomWebDriverWait, "Home Page"); 
        }

        [TearDown]
        public void Close()
        {
            eyes.Close();
            driver.Quit();
        }
    }
}
```
## Selenium Webdriver 

Selenium Webdriver is the means by which functional test are created and employed.  

Selenium Webdriver takes commands written in C# and instructs a browser to perform certain actions based on those commands.  

These commands are not C#, but rather selenese.  

Selenium Webdriver can be adapted employed using other languages such as Java and Python.

Selenium can navigate through sites, perform actions of a keyboard and mouse, navigate to pages, and take really any action afforded by a web application. 

![Selenium 1](/assets/images/Selenium1.jpg)
![Selenium 2](/assets/images/Selenium2.jpg)
![Selenium 3](/assets/images/Selenium3.png)

So specifically, Webdriver tests test the functionality of the website
We use Webdriver to access the webpage, ensure the affordances are on the page, test the functionality of the affordances, and dig deeper into the site. 

This process happens relatively quickly; a test can login to an authenticated site, check the elements of the page, perform discrete functions, and ensure a specific function, destination, or desired of a result is achieved.  

This process happens through assertions.  We can assert if page elements show up or if operations produce an expected result. 

## Nunit

Nunit is the framework from which the test are written. 

Nunit ensure that certain actions are taken before an after a test if needed, for example, running a stored procedure in a database or closing the eyes tool in Applitools.  

Running test in a framework as opposed to the Try/Catch/Finally style ensure that protocols of the test are properly followed and that the test play nice with the grid running the test.

Test fixtures are created in Nunit and allow the setup, teardown, and running of test. 

Setup handles the setup such as opening the Eyes for Applitools or desired capabilities sent to the grid for the browser. 

```csharp
[TestFixture]
    [Parallelizable(ParallelScope.Fixtures)]
    public class LegalTeamAdvancedAttorneySearchDropdownsTest : BaseSetup
    {
        [SetUp]
        public void Init()
        {
            driver = Driver.Setup();
            eyes = Driver.EyesSetup();
            eyes.Open(driver, Driver.AppliToolsAppName, Driver.TestName);
        }
```

The Test contains the instructions for the tests. 

```csharp
[Test]
        public void LegalTeamAdvancedAttorneySearchDropdowns()
```

Teardown does things like closing eyes and running stored procedures to clean up data. 

```csharp
[TearDown]
        public void Close()
        {
            eyes.Close();
            driver.Quit();
        }
```

Nunit allows for test to be written with a parallel scope so that test do not need to run one at a time. 

###### Adding Parallelization 

Nunit also allows for running test in parallel.  This way instead of running 1 test at a time we can run as many as are afforded by our hardware and applications. 
In the AssemblyInfo.cs

We are using Fixtures to run the test in parallel, but if you would like to run your test outside of fixtures you can place a parallel scope of None. 

Currently, we are determining the parallel scope by allowing for 4 projects to be releasing concurrently without more than 1 test running on a single node. 

```csharp
using Nunit.Framework; 

[assembly: Parallelizable(ParallelScope.Fixtures)]; 
[assembly: LevelOfParallelism(5)]; 
```

## Writing Webdriver Tests 

#### The Base Test

The BaseTest or BaseSetup (depending on the use of the framework or not) is where test variables get instantiated and shared methods for shared parts of the application. 

BaseTest is what has been in use in functional test and the BaseSetup is being used with the framework.

This is the case so that the framework and traditional test can be used side by side in the same project. 

All test inherit from the BaseTest or BaseSetup 

This file can handle things like setting up Eyes for Applitools or holding things like a CheckHeader or CheckFooter method. 

```csharp
namespace HWH.FunctionalTests
{
    public class BaseSetup
    {
        public IWebDriver driver;

        public Eyes eyes; 

        public void CheckHeader(IWebDriver wd)
        {
            var header = FindActions.FindVisibleElement(driver, By.ClassName("Header"));
            
            var headerLogo = FindActions.FindVisibleElement(driver, By.Id("HWHLogo"));

            var contactUsLink = FindActions.FindVisibleElement(driver, By.CssSelector(".Header a[href*='contact']"));

            var searchBar = FindActions.FindVisibleElement(driver, By.Id("NewSiteSearch_T8D595C32023_ctl00_ctl00_searchTextBox"));

            var mainNav = FindActions.FindVisibleElement(driver, By.CssSelector("ul.menu"));
        }

        public void CheckFooter(IWebDriver wd)
        {
            var footer = FindActions.FindVisibleElement(driver, By.ClassName("Footer"));

            var topFooter = FindActions.FindVisibleElement(driver, By.ClassName("TopFooter"));

            var bottomFooter = FindActions.FindVisibleElement(driver, By.ClassName("BottomFooter")); 
        }
    }
}
```

#### App Config and RunSettings 

The App.config and RunSettings files are places where variables used in testing are held that differ from project to project. 

The App.config is required in old versions of functional tests and both are required when using the Functional Test Framework.

The RunSettings files are also utilized in the release to identify which environment the test should be looking at when run. 

Things that can be identified in these files are a WebAppUrl, the Selenium server address or a key for Applitools.

###### App.Config 
```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <appSettings>
    <add key="SeleniumServer" value="http://sel-hub-01:4444/wd/hub" />
    <add key="AppliToolsApiKey" value="xxxx" />
    <add key="AppliToolsAppName" value="Test Company" />
    <add key="WebAppUrl" value="http://www.google.com/" />
  </appSettings>
</configuration>
```
###### Runsettings File 
```xml
<?xml version="1.0" encoding="utf-8" ?>
<RunSettings>
  <!-- Configurations that affect the Test Framework -->
  <RunConfiguration>
    <!-- Path relative to solution directory -->
    <ResultsDirectory>.\TestResults</ResultsDirectory>

    <!-- [x86] | x64  
      - You can also change it from menu Test, Test Settings, Default Processor Architecture -->
    <TargetPlatform>x86</TargetPlatform>

    <!-- Framework35 | [Framework40] | Framework45 -->
    <TargetFrameworkVersion>Framework40</TargetFrameworkVersion>

  </RunConfiguration>

  <!-- Parameters used by tests at runtime -->
  <TestRunParameters>
    <Parameter name="WebAppUrl" value="http://www.google.com/" />
  </TestRunParameters>

  <!-- Adapter Specific sections -->
  <!--<NUnit>
    <BasePath>D:\Dev\NUnit\nunit3-vs-adapter\demo\NUnitTestDemo\bin\Release</BasePath>
    <PrivateBinPath>extras;more.extras</PrivateBinPath>
    <DefaultTimeout>5000</DefaultTimeout>
    <WorkDirectory>work</WorkDirectory>
    <InternalTraceLevel>Info</InternalTraceLevel>
  </NUnit>-->

</RunSettings>
``` 
#### Selectors 

```csharp
var element = wd.FindElement(By.ClassName(“class”));
```
To find items on the page and interact with them we need to be able to identify their selector. 

A selector can help us find one item or multiple items, and both have an important application. 

It is important to declare a variable for your selector; this allows your variable to be passed into methods like Click(), improves test readability, and makes it easier for other developers to look at your test and tell what is going on. 

wd is our instance of Webdriver. 

Find element will find the first instance of the (By.ClassName(“class”));

FindElement is useful if you are looking for a specific item, especially when there are no like items on the page. 

Example: I want to find the featured map on the page, and assert that it is displayed. 

FindElements will find all elements matching the (By.ClassName(“class)); 

FindElements is help when you would like to find a group of like items on the page and take some sort of group action on them. 

Example: I want to find all the checkboxes on the page and make sure that I can click each one. 

When choosing selectors it is important to go from the least amount of necessary specificity to the most amount of specificity required to find the appropriate page objects. 

Doing this allows for the test to move forward with the greatest amount of speed and more easily understood selectors are easier to read for the developers that come after you. 

ClassName, ID, and CSS Selector are the most commonly used, with ClassName and ID being preferred. 

Beware of generated IDs; while they make elements very simple to find they are not great for readability, and if a page needs to be re-done all those IDs will be useless. 

In the framework this looks like: 
```csharp
var element = FindActions.FindElement(driver, By.ClassName("class")); 
```
#### Sleeping 

```csharp 
Thread.Sleep(3000); 
```
It is general convention that employing sleeps in functional tests are never best practice; at the very least the should be used sparingly. 

Sleep simply pauses the test for the given amount of time (in milliseconds); 

Using a wait would only pause the test for a period of time until the condition is met, such as waiting for an element to be clickable, visible, or invisible. 

Sleeps do come in handy when you’re having trouble getting everything lined up on the page; especially in an interface test where all elements need to be in their proper place. 

#### Waiting 

```csharp
wait.Until(ExpectedCondition.ElementToBeClicakble(element));
```
Waiting is the proper way to wait for some condition to be met in order to move forward with your test. 

Typical application of this is to wait for an element to be visible on the page or wait for an element to be clickable. 

The instructions of the test will stop until the condition is met.  

The test will wait for the timeout set; this can be a default timeout setup in the BaseTest or something overloaded into the method. 

Wait is the WebDriverWait instantiated in the beginning of the test. 

Until() is the condition upon which the wait is happening. 

The ExpectedCondtions provides a list of condition that can be met that will be waited for. 

![Waiting 1](/assets/images/Waiting1.png)
![Waiting 2](/assets/images/Waiting2.png)

There are numerous conditions that you can wait on. 

In some cases you can pass in your (element) like in ElementToBeClickable or StalenessOf

In other cases you need to use th (By.ClassName(“class”)); 

ElementIsVisible – waits until the element is visible on the page.

ElementToBeClickable – waits until the element can be clicked.

StalenessOf – waits until the element becomes a stale element reference.

VisibilityOfAllElementsLocatedBy – waits until everything found by this selector is visible on the page.

In the framework this would look like:
```csharp
WaitActions.WaitUntilElementIsVisible(driver, element); 
WaitActions.Wait(driver).Until(ExpectedConditions.ElementIsVisible(By.ClassName("class"))); 
```

#### Actions 

```csharp
actions.MoveToElement(element).Perform();
```
The actions feature acts like a mouse pointer. 

This is employed in the typical protocol to click on an element. 

When you visit a webpage manually you don’t think about clicking an element and click it, you need to move your mouse there first! 

Actions can also be used in scrolling.  

While an element might be on a page, it might not be considered visible or displayed because it physically isn’t yet in the test, its out of view.

#### JavaScript Executor 

```csharp 
js.ExecuteScript("arguments[0].scrollIntoView(true);", element);
```
The JavaScript Executor can help you take some actions similar to the actions or .click(); 

You should not need to use this, the proper way to perform these actions is to use selenium features. 

In some situations, you might find an element that is hidden to the Webdriver for some reason, and in a pinch you could use the JavaScript Executor to click it, but this is not best practice.

Above shows how to scroll an element into view, but using actions would be the better way to accomplish this.

#### Navigation

```csharp 
wd.Navigate().GoToUrl(WebAppUrl);
```
This is where we access navigation in our test. 

We can go to a specific Url, or simply go .Back(); 

```csharp
wd.WindowHandles.First();
```

When dealing with links that create a new window or even pages with iframes that are handled as a different window it is important to be able to switch back and forth between them.  

Just because something is in the focus of the test does not mean that Webdriver switches to that window, it must be handled here. 

#### Assertions

```csharp 
Assert.True(element.Displayed);
```

Even though we can mimic the actions of users and navigate throughout the site take advantage of its affordances, it means very little if we can make some assertion about if the desired result has happened or not. 

Assertions are the means by which we “test” if something is displayed or an element has an expected value. 

There a more than a few ways to do assertions; asserting if something is true, false, equal.

What we assert can be very specific or general in a way, but it is best to assert at the lowest possible threshold to determine that your test is achieving the desired result. 

Typical assertions are that an element is displayed, or that the count of a group of elements is greater than 0. 

Assertions can be made more stringent for more stringent criteria. 

You can assert certain CSS values such as height and width.  

You can assert that element text equals a certain value. 

A practical application I have found is capturing an element at a point in the test, and then asserting that that element is not the same at a new point in the test.  

```chsarp
elementBefore = element; 
Action; 
elementAfter = element; 
Assert.True(elementBefore != elementAfter); 
```

#### Stored Procedures

We can use stored procedures to either access some piece of information from the database and use it in our test or use the stored procedure as a way to ensure that we clean up any data introduced by the test in the database. 

While your test should clean up in data that it introduces, sometimes a user is unable to delete data in the system for a specific reason.

Even if your test deletes its own data, placing a stored procedure in the [TearDown] of the test ensures that the data is removed. 

If the test failed while running and never got to the place where it removes that data running a stored procedure would ensure that the data got removed in the closing of the test. 

```csharp
protected void USP_FT_Remove_Member()
{
    var connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["IdentityConnection"].ConnectionString;

    using (SqlConnection connection =
    new SqlConnection(connectionString))
    {
        using (SqlCommand cmd = new SqlCommand("USP_FT_Remove_Member", connection))
        {
            cmd.CommandType = CommandType.StoredProcedure;

            //cmd.Parameters.Add("@FirstName", SqlDbType.VarChar).Value = txtFirstName.Text;
            //cmd.Parameters.Add("@LastName", SqlDbType.VarChar).Value = txtLastName.Text;

            connection.Open();
            cmd.ExecuteNonQuery();
        }
    }
}
```

#### Example Test 

```csharp
[TestFixture]
    [Parallelizable(ParallelScope.Fixtures)]
    public class HomeAttorneySearchTests : BaseSetup
    {
        [SetUp]
        public void Init()
        {
            driver = Driver.Setup();
            eyes = Driver.EyesSetup();
            eyes.Open(driver, Driver.AppliToolsAppName, Driver.TestName);
        }

        [Test]
        public void HomeAttorneySearch()
        {
            NavigationActions.GoToURL(driver, Driver.WebAppUrl);

            CheckHeader(driver);

            CheckFooter(driver);

            var nameSearchInput = FindActions.FindElement(driver, By.ClassName("NameKeywordBox"));

            var practiceDropdown = FindActions.FindElement(driver, By.Id("ContentWrapper_C013_DropDownListShortPractice"));

            var practiceDropdownOptions = FindActions.FindElements(driver, By.CssSelector("#ContentWrapper_C013_DropDownListShortPractice option"));

            var schoolDropdown = FindActions.FindElement(driver, By.Id("ContentWrapper_C013_DropDownListEducationShort"));

            var schoolDropdownOption = FindActions.FindElements(driver, By.CssSelector("#ContentWrapper_C013_DropDownListEducationShort option"));

            var searchButton = FindActions.FindVisibleElement(driver, By.Id("ContentWrapper_C013_btnShortSearch"));

            ClickActions.Click(driver, nameSearchInput);

            KeyActions.SendKeys(driver, nameSearchInput, "Ryan");

            ClickActions.Click(driver, searchButton);

            var searchResults = FindActions.FindVisibleElement(driver, By.ClassName("AttorneyResultsContainer"));
        }

        [TearDown]
        public void Close()
        {
            eyes.Close();
            driver.Quit();
        }
    }
```

## Page Object Model and Abstraction

In Webdriver tests, important concepts to keep in mind are the Page Object Model and abstraction. 

“Within your web app's UI there are areas that your tests interact with. A Page Object simply models these as objects within the test code. This reduces the amount of duplicated code and means that if the UI changes, the fix need only be applied in one place.” - Simon Stewart

Repeatable tasks, actions, affordances, or sections of our webapp should be abstracted out of the actual test and called to when needed. 

Tasks that require a specific protocol  in a combination of actions should be handled in this way to ensure the desired result is regularly achieved. 

These principals will appear in our tests in places like checking the header of the footer of a site.  The header and footer should appear on every page, and we want to make sure that it does, but we don’t need to write the instructions into each test. 

Another instance where we can employ repeatable code is when clicking an object. Each time you go to click on an item, you need to make wait until the item is clickable, move to that item, and then click on the item. 

Setting up these methods in a base test and calling to them when needed saves time, makes test more simple and easy to read, and ensures that proper protocol is followed during test execution.

## Selenium Grid and Grid Extras

The Selenium Grid is a collection of virtual machines that have browsers on them waiting for commands from Nunit and Selenium Webdriver. 

When an instance of a test is run it communicates to the grid to spin up a browser, perform the actions of the test, and close the browser down. 

The grid also has a URL that can be visited which contain the most recent functional test runs so that they can be viewed for troubleshooting.

The grid is contained in house and run with Mercury hardware.  

Grid Extras is the tool that is used to manage the nodes and the hub for the selenium grid. 
This tool manages the test instructions being sent to the nodes that run the test on the browsers setup on the separate machines.

Grid Extras also manages the test environment and ensures that the browsers are properly cleaned up after testing. 

This means that the browsers are meant to simulate an experience where the environment is fresh each time the webpage is visited. 

#### Sauce Labs 

Sauce Labs is a paid service that performs the same actions as the Selenium Grid. 
This is the service that we used in previous iterations of functional tests and in Online Care Reports. 

To use Sauce Labs, the setup of the Webdriver needs to incorporate the correct capabilities for the driver to connect to Sauce.  

This service is still useful for mutli-browser testing and especially for device testing. 

This does not ensure a successful run; test often need to be changed for different browsers and devices. 

Sauce Labs should be used on an as needed basis, as it is a paid service.  

## Functional Test Framework 

The Functional Test Framework was developed to make creating and managing a functional test project simpler, reduce the amount of duplicated code, and ensure the proper protocol of test writing is followed within tests. 

The framework is available as a NuGet package on the MNM feed.

The package can be added to an existing functional test project or used to create a new project with.

The framework contains the essential packages for a test project and combines common selenium actions into methods that can be called within a test project to make test writing easier. 

## Value and Challenges 

#### General Philosophy 

Understand the capabilities of functional tests, there is quite a bit you can do in your functional tests to ensure that your site is acting in the manner you expect. 

While you can test a very specific outcome, it is often times easier to get better coverage with less effort by testing things that can be used in other places in the application and ensuring core elements of the application are available to users in performing in a way that you would expect. 

Remember that even though you can do something very specific, ensure that the value derived from the test is worth the time that will be spent creating the test. 

#### Value 

Simply put, the value in functional tests is to ensure that the expected results of various scenarios are being achieved as a code base changes over time. 

NO SUPRISES! 

Functional Tests provide peace-of-mind that as a web application undergoes further development and changes that the tested parts of the application and the functionality within remain intact. 

Tests can do something as simple as make sure a web page comes up when it is navigated to or do things as complex as test very specific functionality with very specific outcomes. 

Automated testing far exceeds the capabilities of manual testing and decrease its necessity.

Testing in multiple environments on a non-developer machine provides additional consistency and accounts for more variables 

#### Challenges

Like anything in software, there is a correlation between the time (money) spent on functional tests and the return.  The more effort into the testing the more robust the testing will be. 

There are limitations of the solutions themselves.  CMS systems have their own challenges and performance challenges of the hardware they run on.

There is an inherent protocol to testing operations and the concept of time when an action takes place.  Each solution can add its own flavor to this.  Actions must be performed in a certain order for the next action to properly take place.  Time and protocols can vary between solutions and environments.

Intended changes to the solution require changes to the test. This is a normal part of the lifecycle, but still requires time and effort to overcome. 


